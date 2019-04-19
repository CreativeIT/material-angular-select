/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import 'material-design-lite/material';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation, } from '@angular/core';
export class MaterialAngularSelectComponent {
    /**
     * @param {?} changeDetector
     */
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.data = [];
        this.label = '';
        this.name = '';
        this.fixHeight = false;
        this.isFloatingLabel = true;
        this.disabled = false;
        this.arrow = true;
        this.keys = {
            // required if use array of object with different structure
            value: 'value',
            title: 'title',
        };
        this.currentValue = {
            [this.keys.title]: '',
            [this.keys.value]: '',
        };
        this.selectedValue = new EventEmitter();
        this.opened = false;
        this.isFocused = false;
        this.dataArray = [];
        this.isViewInit = false;
        this.todoAfterInit = [];
        this.arrowkeyLocation = 0;
        this.isKeyNavigation = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.id = `id-${this.name}-${Math.round(Math.random() * 100 + 100)}`;
        this.changeDetector.detach();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('classStyle')) {
            changes.classStyle.currentValue.forEach((/**
             * @param {?} style
             * @return {?}
             */
            (style) => {
                this.dropdown.nativeElement.classList.add(style);
            }));
        }
        if (changes.hasOwnProperty('data')) {
            if (!this.isViewInit) {
                this.todoAfterInit.push(this.loadData.bind(this));
            }
            else {
                this.loadData();
            }
        }
        if (changes.hasOwnProperty('currentValue')) {
            if (!this.isViewInit) {
                this.todoAfterInit.push(this.setCurrentValue.bind(this, changes.currentValue.currentValue));
            }
            else {
                this.setCurrentValue(changes.currentValue.currentValue);
                this.setSelectedItem(this.currentValue);
            }
        }
        if (!changes.hasOwnProperty('name')) {
            this.name = (this.name === '') ? this.label.replace(/\s/g, '') : this.name;
        }
        componentHandler.upgradeElements(this.dropdown.nativeElement);
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    setCurrentValue(item) {
        if (!item) {
            return;
        }
        if (typeof item === 'string') {
            this.currentValue = {
                [this.keys.value]: item,
                [this.keys.title]: item,
            };
        }
        else {
            this.currentValue = item;
        }
    }
    /**
     * @private
     * @return {?}
     */
    loadData() {
        if (this.data.length > 0) {
            if (typeof this.data[0] === 'string') {
                this.dataArray = [];
                this.data.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => {
                    this.dataArray.push({
                        [this.keys.value]: item,
                        [this.keys.title]: item,
                    });
                }));
            }
            if (typeof this.data[0] === 'object') {
                this.dataArray = this.data;
            }
        }
        this.disabled = this.dataArray.length < 1 || this.disabled;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.isViewInit = true;
        this.todoAfterInit.forEach((/**
         * @param {?} func
         * @return {?}
         */
        func => func.call()));
        this.todoAfterInit = [];
        this.setSelectedItem(this.currentValue);
        this.changeDetector.detectChanges();
        this.changeDetector.reattach();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    menuKeyDown(event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        this.isKeyNavigation = true;
        /** @type {?} */
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
                }
                else {
                    this.openMenu();
                }
                break;
            case 27: // esc
                this.closeMenu();
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyDownTab(event) {
        /** @type {?} */
        const isVisible = this.menu.nativeElement.parentElement.classList.contains('is-visible');
        switch (event.keyCode) {
            case 9: // tab
                if (isVisible) {
                    this.closeMenu();
                }
                break;
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onInputClick(e) {
        e.stopPropagation();
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        const isVisible = this.menu.nativeElement.parentElement.classList.contains('is-visible');
        this.hideAllMenu();
        if (!isVisible) {
            this.openMenu();
        }
        else {
            this.isFocused = false;
            this.opened = false;
        }
    }
    /**
     * @private
     * @return {?}
     */
    openMenu() {
        this.arrowkeyLocation = this.dataArray.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        item => item[this.keys.value] === this.currentValue[this.keys.value]));
        this.menu.nativeElement['MaterialMenu'].show();
        this.isFocused = true;
        this.opened = true;
    }
    /**
     * @private
     * @return {?}
     */
    closeMenu() {
        this.hideAllMenu();
        this.isFocused = false;
        this.opened = false;
    }
    /**
     * @private
     * @return {?}
     */
    hideAllMenu() {
        /** @type {?} */
        const allSelects = (/** @type {?} */ (document.querySelectorAll('.material-angular-select')));
        allSelects.forEach((/**
         * @param {?} select
         * @return {?}
         */
        (select) => {
            /** @type {?} */
            const menu = select.querySelector('.mdl-js-menu');
            menu['MaterialMenu'].hide();
        }));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    setSelectedItem(item) {
        if (!item) {
            return;
        }
        this.currentValue = item;
        this.selectedValue.emit(item);
        this.dropdown.nativeElement.MaterialTextfield.change(this.currentValue[this.keys.title]); // handles css class changes
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.dropdown.nativeElement.MaterialTextfield.updateClasses_(); // update css class
        }), 250);
        if ('createEvent' in document) {
            /** @type {?} */
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', false, true);
            this.menu.nativeElement['MaterialMenu'].hide();
            this.input.nativeElement.dispatchEvent(evt);
        }
        else {
            this.input.nativeElement.fireEvent('onchange');
        }
    }
}
MaterialAngularSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'material-angular-select',
                template: "<div #dropdown class=\"mdl-textfield mdl-js-textfield material-angular-select\"\n     [class.is-focused]=\"isFocused\"\n     [class.mdl-textfield--floating-label]=\"isFloatingLabel\"\n     [class.material-angular-select__fix-height]=\"fixHeight\">\n  <input #input\n         (click)=\"onInputClick($event)\"\n         (keyup)=\"menuKeyDown($event)\"\n         (keydown)=\"keyDownTab($event)\"\n         (mouseenter)=\"isKeyNavigation = false;\"\n         class=\"mdl-textfield__input\" type=\"text\"\n         [id]=\"id\" tabindex=\"0\" readonly\n         [value]=\"(disabled)? '' : currentValue[keys.title]\"\n         [disabled]=\"disabled\"/>\n  <input #hiddenInput tabindex=\"-1\" type=\"hidden\" [name]=\"name\" [value]=\"(disabled) ? '': currentValue[keys.value]\"/>\n  <label class=\"mdl-textfield__label\" [for]=\"id\">{{ label }}</label>\n  <ul #menu class=\"mdl-menu mdl-menu--bottom-left mdl-js-menu\">\n    <li #li *ngFor=\"let item of dataArray; index as i;\" [attr.data-val]=\"item[keys.value]\" class=\"mdl-menu__item\"\n        (click)=\"setSelectedItem(item)\"\n        [ngClass]=\"{'is-item-hover': i === arrowkeyLocation && isKeyNavigation }\"\n        tabindex=\"-1\">\n      {{ item[keys.title] }}\n    </li>\n  </ul>\n  <label [for]=\"id\" (click)=\"onInputClick($event)\" *ngIf=\"arrow\">\n    <i #arrow class=\"mdl-icon-toggle__label material-icons\">arrow_drop_down</i>\n  </label>\n</div>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["material-angular-select{display:block;outline:0;width:100%}material-angular-select .mdl-textfield__input{cursor:pointer}material-angular-select .mdl-textfield__input:focus{outline:0}material-angular-select .mdl-textfield__label::after{bottom:22px}material-angular-select label{display:block;margin-bottom:0}material-angular-select .mdl-icon-toggle__label{float:right;margin-top:-30px;color:rgba(0,0,0,.87);-webkit-transform:rotate(0);transform:rotate(0);transition:transform .3s;transition:transform .3s,-webkit-transform .3s}material-angular-select.is-focused .mdl-icon-toggle__label{color:#3f51b5;-webkit-transform:rotate(180deg);transform:rotate(180deg)}material-angular-select .is-item-hover{background-color:#eee}material-angular-select .mdl-menu__container{width:100%!important;margin-top:2px}material-angular-select .mdl-menu__container .mdl-menu{width:100%}material-angular-select .mdl-menu__container .mdl-menu .mdl-menu__item{font-size:16px}material-angular-select.has-placeholder .mdl-textfield__label,material-angular-select.is-dirty .mdl-textfield__label,material-angular-select.is-focused .mdl-textfield__label{color:#3f51b5}material-angular-select ::-webkit-scrollbar{width:.5rem;height:.5rem}material-angular-select ::-webkit-scrollbar-thumb{background:#666;cursor:pointer}material-angular-select ::-webkit-scrollbar-track{background:#999}.material-angular-select__fix-height .mdl-menu__container .mdl-menu{overflow-y:auto;max-height:288px!important}.material-angular-select__fix-height .mdl-menu.mdl-menu--top-left{bottom:auto;top:0}"]
            }] }
];
/** @nocollapse */
MaterialAngularSelectComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
MaterialAngularSelectComponent.propDecorators = {
    data: [{ type: Input }],
    label: [{ type: Input }],
    name: [{ type: Input }],
    fixHeight: [{ type: Input }],
    isFloatingLabel: [{ type: Input }],
    disabled: [{ type: Input }],
    classStyle: [{ type: Input }],
    arrow: [{ type: Input }],
    keys: [{ type: Input }],
    currentValue: [{ type: Input }],
    selectedValue: [{ type: Output }],
    dropdown: [{ type: ViewChild, args: ['dropdown',] }],
    input: [{ type: ViewChild, args: ['input',] }],
    hiddenInput: [{ type: ViewChild, args: ['hiddenInput',] }],
    menu: [{ type: ViewChild, args: ['menu',] }],
    list: [{ type: ViewChildren, args: ['li',] }]
};
if (false) {
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.data;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.label;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.name;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.fixHeight;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.isFloatingLabel;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.disabled;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.classStyle;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.arrow;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.keys;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.currentValue;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.selectedValue;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.id;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.dropdown;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.input;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.hiddenInput;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.menu;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.list;
    /**
     * @type {?}
     * @private
     */
    MaterialAngularSelectComponent.prototype.opened;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.isFocused;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.dataArray;
    /**
     * @type {?}
     * @private
     */
    MaterialAngularSelectComponent.prototype.isViewInit;
    /**
     * @type {?}
     * @private
     */
    MaterialAngularSelectComponent.prototype.todoAfterInit;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.arrowkeyLocation;
    /** @type {?} */
    MaterialAngularSelectComponent.prototype.isKeyNavigation;
    /**
     * @type {?}
     * @private
     */
    MaterialAngularSelectComponent.prototype.changeDetector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtYW5ndWxhci1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWF0ZXJpYWwtYW5ndWxhci1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwtYW5ndWxhci1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLCtCQUErQixDQUFDO0FBSXZDLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBRVQsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFTdkIsTUFBTSxPQUFPLDhCQUE4Qjs7OztJQW9DekMsWUFBMkIsY0FBaUM7UUFBakMsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBbkM1QyxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ1YsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUN2QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixTQUFJLEdBQUc7O1lBQ3JCLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87U0FDZixDQUFDO1FBQ2MsaUJBQVksR0FBRztZQUM3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUNyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtTQUN0QixDQUFDO1FBRWUsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBVTVDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2QsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNwQixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsb0JBQWUsR0FBRyxLQUFLLENBQUM7SUFJL0IsQ0FBQzs7OztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNyRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRU0sV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN4QyxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqQjtTQUNGO1FBRUQsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQzdGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekM7U0FDRjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDNUU7UUFDRCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsSUFBSTtRQUMxQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTztTQUNSO1FBQ0QsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDbEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUk7Z0JBQ3ZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJO2FBQ3hCLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7OztJQUVPLFFBQVE7UUFDZCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87Ozs7Z0JBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7d0JBQ2xCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJO3dCQUN2QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSTtxQkFDeEIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsRUFBQyxDQUFDO2FBQ0o7WUFDRCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM1QjtTQUNGO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUM3RCxDQUFDOzs7O0lBRU0sZUFBZTtRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU87Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVNLFdBQVcsQ0FBQyxLQUFvQjtRQUNyQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNqQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDOztjQUN0QixTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQ3hGLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNyQixLQUFLLEVBQUUsRUFBRSxXQUFXO2dCQUNsQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUMxRyxNQUFNO1lBQ1IsS0FBSyxFQUFFLEVBQUUsYUFBYTtnQkFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7Z0JBQzdHLE1BQU07WUFDUixLQUFLLEVBQUUsRUFBRSxRQUFRO2dCQUNmLElBQUksU0FBUyxFQUFFO29CQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7aUJBQ2xCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakI7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssRUFBRSxFQUFFLE1BQU07Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixNQUFNO1NBQ1Q7SUFDSCxDQUFDOzs7OztJQUVNLFVBQVUsQ0FBQyxLQUFLOztjQUNmLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFDeEYsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ3JCLEtBQUssQ0FBQyxFQUFFLE1BQU07Z0JBQ1osSUFBSSxTQUFTLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUNsQjtnQkFDRCxNQUFNO1NBQ1Q7SUFDSCxDQUFDOzs7OztJQUVNLFlBQVksQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSOztjQUVLLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFDeEYsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxRQUFRO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUzs7OztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7UUFDdkgsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFTyxTQUFTO1FBQ2YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU8sV0FBVzs7Y0FDWCxVQUFVLEdBQUcsbUJBQUEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixDQUFDLEVBQU87UUFDL0UsVUFBVSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLE1BQW1CLEVBQUUsRUFBRTs7a0JBQ25DLElBQUksR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVNLGVBQWUsQ0FBQyxJQUFJO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7UUFDdEgsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7UUFDckYsQ0FBQyxHQUNVLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLElBQUksYUFBYSxJQUFJLFFBQVEsRUFBRTs7a0JBQ3ZCLEdBQUcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztZQUM5QyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdDO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7WUEzTkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBRW5DLG81Q0FBdUQ7Z0JBQ3ZELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQXBCQyxpQkFBaUI7OzttQkF1QmhCLEtBQUs7b0JBQ0wsS0FBSzttQkFDTCxLQUFLO3dCQUNMLEtBQUs7OEJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7b0JBQ0wsS0FBSzttQkFDTCxLQUFLOzJCQUlMLEtBQUs7NEJBS0wsTUFBTTt1QkFJTixTQUFTLFNBQUMsVUFBVTtvQkFDcEIsU0FBUyxTQUFDLE9BQU87MEJBQ2pCLFNBQVMsU0FBQyxhQUFhO21CQUN2QixTQUFTLFNBQUMsTUFBTTttQkFDaEIsWUFBWSxTQUFDLElBQUk7Ozs7SUF6QmxCLDhDQUFpQzs7SUFDakMsK0NBQTJCOztJQUMzQiw4Q0FBMEI7O0lBQzFCLG1EQUFrQzs7SUFDbEMseURBQXVDOztJQUN2QyxrREFBaUM7O0lBQ2pDLG9EQUFxQzs7SUFDckMsK0NBQTZCOztJQUM3Qiw4Q0FHRTs7SUFDRixzREFHRTs7SUFFRix1REFBb0Q7O0lBRXBELDRDQUFrQjs7SUFFbEIsa0RBQTRDOztJQUM1QywrQ0FBc0M7O0lBQ3RDLHFEQUFrRDs7SUFDbEQsOENBQW9DOztJQUNwQyw4Q0FBZ0Q7Ozs7O0lBRWhELGdEQUF1Qjs7SUFDdkIsbURBQXlCOztJQUN6QixtREFBc0I7Ozs7O0lBQ3RCLG9EQUEyQjs7Ozs7SUFDM0IsdURBQTJCOztJQUMzQiwwREFBNEI7O0lBQzVCLHlEQUErQjs7Ozs7SUFFWix3REFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ21hdGVyaWFsLWRlc2lnbi1saXRlL21hdGVyaWFsJztcblxuZGVjbGFyZSB2YXIgY29tcG9uZW50SGFuZGxlcjogYW55O1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdGVyaWFsLWFuZ3VsYXItc2VsZWN0JywgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuICBzdHlsZVVybHM6IFsnLi9tYXRlcmlhbC1hbmd1bGFyLXNlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJy4vbWF0ZXJpYWwtYW5ndWxhci1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG59KVxuXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxBbmd1bGFyU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBwdWJsaWMgZGF0YTogYW55W10gPSBbXTtcbiAgQElucHV0KCkgcHVibGljIGxhYmVsID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBuYW1lID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBmaXhIZWlnaHQgPSBmYWxzZTtcbiAgQElucHV0KCkgcHVibGljIGlzRmxvYXRpbmdMYWJlbCA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgY2xhc3NTdHlsZTogc3RyaW5nW107XG4gIEBJbnB1dCgpIHB1YmxpYyBhcnJvdyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBrZXlzID0geyAvLyByZXF1aXJlZCBpZiB1c2UgYXJyYXkgb2Ygb2JqZWN0IHdpdGggZGlmZmVyZW50IHN0cnVjdHVyZVxuICAgIHZhbHVlOiAndmFsdWUnLFxuICAgIHRpdGxlOiAndGl0bGUnLFxuICB9O1xuICBASW5wdXQoKSBwdWJsaWMgY3VycmVudFZhbHVlID0ge1xuICAgIFt0aGlzLmtleXMudGl0bGVdOiAnJyxcbiAgICBbdGhpcy5rZXlzLnZhbHVlXTogJycsXG4gIH07XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBzZWxlY3RlZFZhbHVlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuXG4gIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duJykgZHJvcGRvd246IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2hpZGRlbklucHV0JykgaGlkZGVuSW5wdXQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ21lbnUnKSBtZW51OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkcmVuKCdsaScpIGxpc3Q6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBwcml2YXRlIG9wZW5lZCA9IGZhbHNlO1xuICBwdWJsaWMgaXNGb2N1c2VkID0gZmFsc2U7XG4gIHB1YmxpYyBkYXRhQXJyYXkgPSBbXTtcbiAgcHJpdmF0ZSBpc1ZpZXdJbml0ID0gZmFsc2U7XG4gIHByaXZhdGUgdG9kb0FmdGVySW5pdCA9IFtdO1xuICBwdWJsaWMgYXJyb3drZXlMb2NhdGlvbiA9IDA7XG4gIHB1YmxpYyBpc0tleU5hdmlnYXRpb24gPSBmYWxzZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcblxuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaWQgPSBgaWQtJHt0aGlzLm5hbWV9LSR7TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAwICsgMTAwKX1gO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0YWNoKCk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdjbGFzc1N0eWxlJykpIHtcbiAgICAgIGNoYW5nZXMuY2xhc3NTdHlsZS5jdXJyZW50VmFsdWUuZm9yRWFjaCgoc3R5bGUpID0+IHtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoc3R5bGUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkge1xuICAgICAgaWYgKCF0aGlzLmlzVmlld0luaXQpIHtcbiAgICAgICAgdGhpcy50b2RvQWZ0ZXJJbml0LnB1c2godGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnY3VycmVudFZhbHVlJykpIHtcbiAgICAgIGlmICghdGhpcy5pc1ZpZXdJbml0KSB7XG4gICAgICAgIHRoaXMudG9kb0FmdGVySW5pdC5wdXNoKHRoaXMuc2V0Q3VycmVudFZhbHVlLmJpbmQodGhpcywgY2hhbmdlcy5jdXJyZW50VmFsdWUuY3VycmVudFZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldEN1cnJlbnRWYWx1ZShjaGFuZ2VzLmN1cnJlbnRWYWx1ZS5jdXJyZW50VmFsdWUpO1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkSXRlbSh0aGlzLmN1cnJlbnRWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjaGFuZ2VzLmhhc093blByb3BlcnR5KCduYW1lJykpIHtcbiAgICAgIHRoaXMubmFtZSA9ICh0aGlzLm5hbWUgPT09ICcnKSA/IHRoaXMubGFiZWwucmVwbGFjZSgvXFxzL2csICcnKSA6IHRoaXMubmFtZTtcbiAgICB9XG4gICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudHModGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3VycmVudFZhbHVlKGl0ZW0pIHtcbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5jdXJyZW50VmFsdWUgPSB7XG4gICAgICAgIFt0aGlzLmtleXMudmFsdWVdOiBpdGVtLFxuICAgICAgICBbdGhpcy5rZXlzLnRpdGxlXTogaXRlbSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudFZhbHVlID0gaXRlbTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWREYXRhKCkge1xuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLmRhdGFbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuZGF0YUFycmF5ID0gW107XG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5kYXRhQXJyYXkucHVzaCh7XG4gICAgICAgICAgICBbdGhpcy5rZXlzLnZhbHVlXTogaXRlbSxcbiAgICAgICAgICAgIFt0aGlzLmtleXMudGl0bGVdOiBpdGVtLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5kYXRhWzBdID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLmRhdGFBcnJheSA9IHRoaXMuZGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMuZGF0YUFycmF5Lmxlbmd0aCA8IDEgfHwgdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5pc1ZpZXdJbml0ID0gdHJ1ZTtcbiAgICB0aGlzLnRvZG9BZnRlckluaXQuZm9yRWFjaChmdW5jID0+IGZ1bmMuY2FsbCgpKTtcbiAgICB0aGlzLnRvZG9BZnRlckluaXQgPSBbXTtcbiAgICB0aGlzLnNldFNlbGVjdGVkSXRlbSh0aGlzLmN1cnJlbnRWYWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5yZWF0dGFjaCgpO1xuICB9XG5cbiAgcHVibGljIG1lbnVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMuaXNLZXlOYXZpZ2F0aW9uID0gdHJ1ZTtcbiAgICBjb25zdCBpc1Zpc2libGUgPSB0aGlzLm1lbnUubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnaXMtdmlzaWJsZScpO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSAzODogLy8gYXJyb3cgdXBcbiAgICAgICAgdGhpcy5hcnJvd2tleUxvY2F0aW9uID0gdGhpcy5hcnJvd2tleUxvY2F0aW9uID4gMCA/IHRoaXMuYXJyb3drZXlMb2NhdGlvbiAtIDEgOiB0aGlzLmRhdGFBcnJheS5sZW5ndGggLSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDA6IC8vIGFycm93IGRvd25cbiAgICAgICAgdGhpcy5hcnJvd2tleUxvY2F0aW9uID0gdGhpcy5hcnJvd2tleUxvY2F0aW9uID49ICh0aGlzLmRhdGFBcnJheS5sZW5ndGggLSAxKSA/IDAgOiB0aGlzLmFycm93a2V5TG9jYXRpb24gKyAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTM6IC8vIGVudGVyXG4gICAgICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICAgICB0aGlzLnNldEN1cnJlbnRWYWx1ZSh0aGlzLmRhdGFbdGhpcy5hcnJvd2tleUxvY2F0aW9uXSk7XG4gICAgICAgICAgdGhpcy5jbG9zZU1lbnUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9wZW5NZW51KCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI3OiAvLyBlc2NcbiAgICAgICAgdGhpcy5jbG9zZU1lbnUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGtleURvd25UYWIoZXZlbnQpIHtcbiAgICBjb25zdCBpc1Zpc2libGUgPSB0aGlzLm1lbnUubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnaXMtdmlzaWJsZScpO1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSA5OiAvLyB0YWJcbiAgICAgICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICAgIHRoaXMuY2xvc2VNZW51KCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uSW5wdXRDbGljayhlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlzVmlzaWJsZSA9IHRoaXMubWVudS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy12aXNpYmxlJyk7XG4gICAgdGhpcy5oaWRlQWxsTWVudSgpO1xuICAgIGlmICghaXNWaXNpYmxlKSB7XG4gICAgICB0aGlzLm9wZW5NZW51KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb3Blbk1lbnUoKSB7XG4gICAgdGhpcy5hcnJvd2tleUxvY2F0aW9uID0gdGhpcy5kYXRhQXJyYXkuZmluZEluZGV4KGl0ZW0gPT4gaXRlbVt0aGlzLmtleXMudmFsdWVdID09PSB0aGlzLmN1cnJlbnRWYWx1ZVt0aGlzLmtleXMudmFsdWVdKTtcbiAgICB0aGlzLm1lbnUubmF0aXZlRWxlbWVudFsnTWF0ZXJpYWxNZW51J10uc2hvdygpO1xuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlTWVudSgpIHtcbiAgICB0aGlzLmhpZGVBbGxNZW51KCk7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBoaWRlQWxsTWVudSgpIHtcbiAgICBjb25zdCBhbGxTZWxlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1hdGVyaWFsLWFuZ3VsYXItc2VsZWN0JykgYXMgYW55O1xuICAgIGFsbFNlbGVjdHMuZm9yRWFjaCgoc2VsZWN0OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgbWVudSA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCcubWRsLWpzLW1lbnUnKTtcbiAgICAgIG1lbnVbJ01hdGVyaWFsTWVudSddLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTZWxlY3RlZEl0ZW0oaXRlbSkge1xuICAgIGlmICghaXRlbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IGl0ZW07XG4gICAgdGhpcy5zZWxlY3RlZFZhbHVlLmVtaXQoaXRlbSk7XG4gICAgdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50Lk1hdGVyaWFsVGV4dGZpZWxkLmNoYW5nZSh0aGlzLmN1cnJlbnRWYWx1ZVt0aGlzLmtleXMudGl0bGVdKTsgLy8gaGFuZGxlcyBjc3MgY2xhc3MgY2hhbmdlc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50Lk1hdGVyaWFsVGV4dGZpZWxkLnVwZGF0ZUNsYXNzZXNfKCk7IC8vIHVwZGF0ZSBjc3MgY2xhc3NcbiAgICB9LFxuICAgICAgICAgICAgICAgMjUwKTtcblxuICAgIGlmICgnY3JlYXRlRXZlbnQnIGluIGRvY3VtZW50KSB7XG4gICAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpO1xuICAgICAgdGhpcy5tZW51Lm5hdGl2ZUVsZW1lbnRbJ01hdGVyaWFsTWVudSddLmhpZGUoKTtcbiAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5maXJlRXZlbnQoJ29uY2hhbmdlJyk7XG4gICAgfVxuICB9XG59XG4iXX0=