import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';

import { MaterialMenu } from './mdl/material-menu';
import { MaterialTextfield } from './mdl/material-textfield';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'material-angular-select', // tslint:disable-line
  styleUrls: ['./material-angular-select.component.scss'],
  templateUrl: './material-angular-select.component.html',
  encapsulation: ViewEncapsulation.None, // tslint:disable-line
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaterialAngularSelectComponent),
      multi: true,
    },
  ],
})

export class MaterialAngularSelectComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  @Input() public data: any[] = [];
  @Input() public label = '';
  @Input() public name = '';
  @Input() public fixHeight = false;
  @Input() public isFloatingLabel = true;
  @Input() public disabled = false;
  @Input() public classStyle: string[];
  @Input() public arrow = true;
  @Input() public keys = { // required if use array of object with different structure
    value: 'value',
    title: 'title',
  };
  @Input() public currentValue = {
    [this.keys.title]: '',
    [this.keys.value]: '',
  };
  @Input() public inputId: string;
  @Input() public typeahead = false;

  @Output() public selectedValue = new EventEmitter();

  @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
  @ViewChild('input', { static: true }) input: ElementRef;
  @ViewChild('hiddenInput', { static: false }) hiddenInput: ElementRef;
  @ViewChild('menu', { static: true }) menu: ElementRef;
  @ViewChildren('li') list: QueryList<ElementRef>;

  private opened = false;
  public isFocused = false;
  public dataArray = [];
  private isViewInit = false;
  private todoAfterInit = [];
  public arrowkeyLocation = 0;
  public isKeyNavigation = false;

  private registeredComponents = [];
  private componentConfigProperty = 'mdlComponentConfigInternal_';
  private createdComponents = [];

  public selectedDataArray = [];

  @Input() public selector(query: string, dataArray: any[]) {
    if (!query) {
      return dataArray;
    } else {
      return dataArray.filter(
        row => (
          row[this.keys.value].toLowerCase().includes(query.toLowerCase())
          || row[this.keys.title].toLowerCase().includes(query.toLowerCase())
        ),
      );
    }
  }

  onChange: (_: any) => void = () => {};
  onTouched: () => void = () => {};

  public constructor(private changeDetector: ChangeDetectorRef) {
    this.register({
      constructor: MaterialMenu,
      classAsString: 'MaterialMenu',
      cssClass: 'mas-js-menu',
      widget: true
    });
    this.register({
      constructor: MaterialTextfield,
      classAsString: 'MaterialTextfield',
      cssClass: 'mas-js-textfield',
      widget: true
    });
  }

  writeValue(value: any): void {
    this.setCurrentValue(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public ngOnInit() {
    this.inputId = this.inputId || `id-${this.name}-${Math.round(Math.random() * 100 + 100)}`;
    this.changeDetector.detach();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('classStyle')) {
      changes.classStyle.currentValue.forEach((style) => {
        this.dropdown.nativeElement.classList.add(style);
      });
    }

    if (changes.hasOwnProperty('data')) {
      if (!this.isViewInit) {
        this.todoAfterInit.push(() => this.loadData());
      } else {
        this.loadData();
      }
    }

    if (changes.hasOwnProperty('currentValue')) {
      if (!this.isViewInit) {
        this.todoAfterInit.push(() => this.setCurrentValue(changes.currentValue.currentValue));
      } else {
        this.setCurrentValue(changes.currentValue.currentValue);
        this.setSelectedItem(this.currentValue);
      }
    }

    if (!changes.hasOwnProperty('name')) {
      this.name = (this.name === '') ? this.label.replace(/\s/g, '') : this.name;
    }
    this.upgradeElements(this.dropdown.nativeElement);
  }

  private upgradeElements(elements) {
    if (!Array.isArray(elements)) {
      if (elements instanceof Element) {
        elements = [elements];
      } else {
        elements = Array.prototype.slice.call(elements);
      }
    }
    for (const element of elements) {
      if (element instanceof HTMLElement) {
        this.upgradeElement(element);
        if (element.children.length > 0) {
          this.upgradeElements(element.children);
        }
      }
    }
  }

  private upgradeElement(element, optJsClass?) {
    // Verify argument type.
    if (!(typeof element === 'object' && element instanceof Element)) {
      throw new Error('Invalid argument provided to upgrade MDL element.');
    }
    // Allow upgrade to be canceled by canceling emitted event.
    const upgradingEv = this.createEvent_('mas-componentupgrading', true, true);
    element.dispatchEvent(upgradingEv);
    if (upgradingEv.defaultPrevented) {
      return;
    }

    const upgradedList = this.getUpgradedListOfElement_(element);
    const classesToUpgrade = [];
    // If jsClass is not provided scan the registered components to find the
    // ones matching the element's CSS classList.
    if (!optJsClass) {
      const classList = element.classList;
      this.registeredComponents.forEach((component) => {
        // Match CSS & Not to be upgraded & Not upgraded.
        if (classList.contains(component.cssClass) &&
          classesToUpgrade.indexOf(component) === -1 &&
          !this.isElementUpgraded_(element, component.className)) {
          classesToUpgrade.push(component);
        }
      });
    } else if (!this.isElementUpgraded_(element, optJsClass)) {
      classesToUpgrade.push(this.findRegisteredClass_(optJsClass));
    }

    // Upgrade the element for each classes.
    for (const registeredClass of classesToUpgrade) {
      if (registeredClass) {
        // Mark element as upgraded.
        upgradedList.push(registeredClass.className);
        element.setAttribute('data-upgraded', upgradedList.join(','));
        const instance = new registeredClass.classConstructor(element);
        instance[this.componentConfigProperty] = registeredClass;
        this.createdComponents.push(instance);
        // Call any callbacks the user has registered with this component type.
        for (const callback of registeredClass.callbacks) {
          callback(element);
        }

        if (registeredClass.widget) {
          // Assign per element instance for control over API
          element[registeredClass.className] = instance;
        }
      } else {
        throw new Error(
          'Unable to find a registered component for the given class.');
      }

      const upgradedEv = this.createEvent_('mas-componentupgraded', true, false);
      element.dispatchEvent(upgradedEv);
    }
  }

  private createEvent_(eventType, bubbles, cancelable) {
    if ('CustomEvent' in window && typeof (window as any).CustomEvent === 'function') {
      return new CustomEvent(eventType, {
        bubbles,
        cancelable,
      });
    } else {
      const ev = document.createEvent('Events');
      ev.initEvent(eventType, bubbles, cancelable);
      return ev;
    }
  }

  private getUpgradedListOfElement_(element) {
    const dataUpgraded = element.getAttribute('data-upgraded');
    // Use `['']` as default value to conform the `,name,name...` style.
    return dataUpgraded === null ? [''] : dataUpgraded.split(',');
  }

  private setCurrentValue(item) {
    if (!item) {
      return;
    }
    if (typeof item === 'string') {
      this.currentValue = {
        [this.keys.value]: item,
        [this.keys.title]: item,
      };
    } else {
      this.currentValue = item;
    }
  }

  private isElementUpgraded_(element, jsClass) {
    const upgradedList = this.getUpgradedListOfElement_(element);
    return upgradedList.indexOf(jsClass) !== -1;
  }

  private findRegisteredClass_(name, optReplace?) {
    for (let i = 0; i < this.registeredComponents.length; i++) {
      if (this.registeredComponents[i].className === name) {
        if (typeof optReplace !== 'undefined') {
          this.registeredComponents[i] = optReplace;
        }
        return this.registeredComponents[i];
      }
    }
    return false;
  }

  private register(config) {
    // In order to support both Closure-compiled and uncompiled code accessing
    // this method, we need to allow for both the dot and array syntax for
    // property access. You'll therefore see the `foo.bar || foo['bar']`
    // pattern repeated across this method.
    const widgetMissing = (typeof config.widget === 'undefined' &&
      typeof config.widget === 'undefined');
    let widget = true;

    if (!widgetMissing) {
      widget = config.widget || config.widget;
    }

    const newConfig = ({
      classConstructor: config.constructor || config.constructor,
      className: config.classAsString || config.classAsString,
      cssClass: config.cssClass || config.cssClass,
      widget,
      callbacks: []
    });

    this.registeredComponents.forEach((item) => {
      if (item.cssClass === newConfig.cssClass) {
        throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
      }
      if (item.className === newConfig.className) {
        throw new Error('The provided className has already been registered');
      }
    });

    if (config.constructor.prototype
      .hasOwnProperty(this.componentConfigProperty)) {
      throw new Error(
        'MDL component classes must not have ' + this.componentConfigProperty +
        ' defined as a property.');
    }

    const found = this.findRegisteredClass_(config.classAsString, newConfig);

    if (!found) {
      this.registeredComponents.push(newConfig);
    }
  }

  private loadData() {
    if (this.data.length > 0) {
      if (typeof this.data[0] === 'string') {
        this.dataArray = [];
        this.data.forEach((item) => {
          this.dataArray.push({
            [this.keys.value]: item,
            [this.keys.title]: item,
          });
        });
      }
      if (typeof this.data[0] === 'object') {
        this.dataArray = this.data;
      }
    }
    this.selectedDataArray = this.selector(this.input.nativeElement.value, this.dataArray);
    this.disabled = this.dataArray.length < 1 || this.disabled;
  }

  public ngAfterViewInit() {
    this.isViewInit = true;
    this.todoAfterInit.forEach(func => func());
    this.todoAfterInit = [];
    this.setSelectedItem(this.currentValue);
    this.changeDetector.detectChanges();
    this.changeDetector.reattach();
  }

  public menuKeyDown(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    this.isKeyNavigation = true;
    const isVisible = this.menu.nativeElement.parentElement.classList.contains('is-visible');
    switch (event.code) {
      case 'ArrowUp':
        this.arrowkeyLocation = this.arrowkeyLocation > 0 ? this.arrowkeyLocation - 1 : this.dataArray.length - 1;
        break;
      case 'ArrowDown':
        this.arrowkeyLocation = this.arrowkeyLocation >= (this.dataArray.length - 1) ? 0 : this.arrowkeyLocation + 1;
        break;
      case 'Enter':
        if (isVisible) {
          this.setCurrentValue(this.data[this.arrowkeyLocation]);
          this.closeMenu();
        } else {
          this.openMenu();
        }
        break;
      case 'Escape':
        this.closeMenu();
        break;
      default:
        this.reselectData();
        break;
    }
  }

  public keyDownTab(event) {
    const isVisible = this.menu.nativeElement.parentElement.classList.contains('is-visible');
    switch (event.code) {
      case 'Tab':
        if (isVisible) {
          this.closeMenu();
        }
        break;
    }
  }

  public onInputClick(e) {
    e.stopPropagation();
    if (this.disabled) {
      return;
    }

    const isVisible = this.menu.nativeElement.parentElement.classList.contains('is-visible');
    this.hideAllMenu();
    if (!isVisible) {
      this.reselectData();
      this.openMenu();
    } else {
      this.isFocused = false;
      this.opened = false;
    }
  }

  private reselectData() {
    this.selectedDataArray = this.selector(this.input.nativeElement.value, this.dataArray);
    setTimeout(() => this.menu.nativeElement.MaterialMenu.updateClip(), 0);
  }

  private openMenu() {
    this.arrowkeyLocation = this.dataArray.findIndex(item => item[this.keys.value] === this.currentValue[this.keys.value]);
    this.menu.nativeElement.MaterialMenu.show();
    this.isFocused = true;
    this.opened = true;
  }

  private closeMenu() {
    this.hideAllMenu();
    this.isFocused = false;
    this.opened = false;
  }

  private hideAllMenu() {
    const allSelects = document.querySelectorAll('.material-angular-select') as any;
    allSelects.forEach((select: HTMLElement) => {
      const menu = select.querySelector('.mas-js-menu') as any;
      menu.MaterialMenu.hide();
    });
  }

  public setSelectedItem(item) {
    if (!item) {
      return;
    }
    this.currentValue = item;
    this.selectedValue.emit(item);
    this.dropdown.nativeElement.MaterialTextfield.change(this.currentValue[this.keys.title]); // handles css class changes
    setTimeout(() => {
      this.dropdown.nativeElement.MaterialTextfield.updateClasses_(); // update css class
    }, 250);

    if ('createEvent' in document) {
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', false, true);
      this.menu.nativeElement.MaterialMenu.hide();
      this.input.nativeElement.dispatchEvent(evt);
    } else {
      this.input.nativeElement.fireEvent('onchange');
    }
    setTimeout(() => this.onChange(item), 0);
  }
}
