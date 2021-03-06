import 'material-design-lite/material';

declare var componentHandler: any;

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
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

@Component({
  selector: 'material-angular-select', // tslint:disable-line
  styleUrls: ['./material-angular-select.component.scss'],
  templateUrl: './material-angular-select.component.html',
  encapsulation: ViewEncapsulation.None, // tslint:disable-line
})

export class MaterialAngularSelectComponent implements OnInit, OnChanges, AfterViewInit {
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

  @Output() public selectedValue = new EventEmitter();

  public id: string;

  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('hiddenInput') hiddenInput: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChildren('li') list: QueryList<ElementRef>;

  private opened = false;
  public isFocused = false;
  public dataArray = [];
  private isViewInit = false;
  private todoAfterInit = [];
  public arrowkeyLocation = 0;
  public isKeyNavigation = false;

  public constructor(private changeDetector: ChangeDetectorRef) {

  }

  public ngOnInit() {
    this.id = `id-${this.name}-${Math.round(Math.random() * 100 + 100)}`;
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
        this.todoAfterInit.push(this.loadData.bind(this));
      } else {
        this.loadData();
      }
    }

    if (changes.hasOwnProperty('currentValue')) {
      if (!this.isViewInit) {
        this.todoAfterInit.push(this.setCurrentValue.bind(this, changes.currentValue.currentValue));
      } else {
        this.setCurrentValue(changes.currentValue.currentValue);
        this.setSelectedItem(this.currentValue);
      }
    }

    if (!changes.hasOwnProperty('name')) {
      this.name = (this.name === '') ? this.label.replace(/\s/g, '') : this.name;
    }
    componentHandler.upgradeElements(this.dropdown.nativeElement);
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
    this.disabled = this.dataArray.length < 1 || this.disabled;
  }

  public ngAfterViewInit() {
    this.isViewInit = true;
    this.todoAfterInit.forEach(func => func.call());
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
    switch (event.keyCode) {
      case 38: // arrow up
        this.arrowkeyLocation = this.arrowkeyLocation > 0 ? this.arrowkeyLocation - 1 : this.dataArray.length - 1;
        break;
      case 40: // arrow down
        this.arrowkeyLocation = this.arrowkeyLocation >= (this.dataArray.length - 1) ? 0 : this.arrowkeyLocation + 1;
        break;
      case 13: // enter
        if (isVisible) {
          this.setCurrentValue(this.data[this.arrowkeyLocation]);
          this.closeMenu();
        } else {
          this.openMenu();
        }
        break;
      case 27: // esc
        this.closeMenu();
        break;
    }
  }

  public keyDownTab(event) {
    const isVisible = this.menu.nativeElement.parentElement.classList.contains('is-visible');
    switch (event.keyCode) {
      case 9: // tab
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
      this.openMenu();
    } else {
      this.isFocused = false;
      this.opened = false;
    }
  }

  private openMenu() {
    this.arrowkeyLocation = this.dataArray.findIndex(item => item[this.keys.value] === this.currentValue[this.keys.value]);
    this.menu.nativeElement['MaterialMenu'].show();
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
      const menu = select.querySelector('.mdl-js-menu');
      menu['MaterialMenu'].hide();
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
    },
               250);

    if ('createEvent' in document) {
      const evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', false, true);
      this.menu.nativeElement['MaterialMenu'].hide();
      this.input.nativeElement.dispatchEvent(evt);
    } else {
      this.input.nativeElement.fireEvent('onchange');
    }
  }
}
