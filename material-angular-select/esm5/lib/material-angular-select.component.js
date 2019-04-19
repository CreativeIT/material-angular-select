/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import 'material-design-lite/material';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation, } from '@angular/core';
var MaterialAngularSelectComponent = /** @class */ (function () {
    function MaterialAngularSelectComponent(changeDetector) {
        var _a;
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
        this.currentValue = (_a = {},
            _a[this.keys.title] = '',
            _a[this.keys.value] = '',
            _a);
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
    MaterialAngularSelectComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.id = "id-" + this.name + "-" + Math.round(Math.random() * 100 + 100);
        this.changeDetector.detach();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.hasOwnProperty('classStyle')) {
            changes.classStyle.currentValue.forEach((/**
             * @param {?} style
             * @return {?}
             */
            function (style) {
                _this.dropdown.nativeElement.classList.add(style);
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
    };
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.setCurrentValue = /**
     * @private
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _a;
        if (!item) {
            return;
        }
        if (typeof item === 'string') {
            this.currentValue = (_a = {},
                _a[this.keys.value] = item,
                _a[this.keys.title] = item,
                _a);
        }
        else {
            this.currentValue = item;
        }
    };
    /**
     * @private
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.loadData = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.data.length > 0) {
            if (typeof this.data[0] === 'string') {
                this.dataArray = [];
                this.data.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    var _a;
                    _this.dataArray.push((_a = {},
                        _a[_this.keys.value] = item,
                        _a[_this.keys.title] = item,
                        _a));
                }));
            }
            if (typeof this.data[0] === 'object') {
                this.dataArray = this.data;
            }
        }
        this.disabled = this.dataArray.length < 1 || this.disabled;
    };
    /**
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.isViewInit = true;
        this.todoAfterInit.forEach((/**
         * @param {?} func
         * @return {?}
         */
        function (func) { return func.call(); }));
        this.todoAfterInit = [];
        this.setSelectedItem(this.currentValue);
        this.changeDetector.detectChanges();
        this.changeDetector.reattach();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.menuKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        this.isKeyNavigation = true;
        /** @type {?} */
        var isVisible = this.menu.nativeElement.parentElement.classList.contains('is-visible');
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.keyDownTab = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var isVisible = this.menu.nativeElement.parentElement.classList.contains('is-visible');
        switch (event.keyCode) {
            case 9: // tab
                if (isVisible) {
                    this.closeMenu();
                }
                break;
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.onInputClick = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var isVisible = this.menu.nativeElement.parentElement.classList.contains('is-visible');
        this.hideAllMenu();
        if (!isVisible) {
            this.openMenu();
        }
        else {
            this.isFocused = false;
            this.opened = false;
        }
    };
    /**
     * @private
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.openMenu = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.arrowkeyLocation = this.dataArray.findIndex((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item[_this.keys.value] === _this.currentValue[_this.keys.value]; }));
        this.menu.nativeElement['MaterialMenu'].show();
        this.isFocused = true;
        this.opened = true;
    };
    /**
     * @private
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.closeMenu = /**
     * @private
     * @return {?}
     */
    function () {
        this.hideAllMenu();
        this.isFocused = false;
        this.opened = false;
    };
    /**
     * @private
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.hideAllMenu = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var allSelects = (/** @type {?} */ (document.querySelectorAll('.material-angular-select')));
        allSelects.forEach((/**
         * @param {?} select
         * @return {?}
         */
        function (select) {
            /** @type {?} */
            var menu = select.querySelector('.mdl-js-menu');
            menu['MaterialMenu'].hide();
        }));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    MaterialAngularSelectComponent.prototype.setSelectedItem = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        if (!item) {
            return;
        }
        this.currentValue = item;
        this.selectedValue.emit(item);
        this.dropdown.nativeElement.MaterialTextfield.change(this.currentValue[this.keys.title]); // handles css class changes
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.dropdown.nativeElement.MaterialTextfield.updateClasses_(); // update css class
        }), 250);
        if ('createEvent' in document) {
            /** @type {?} */
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('change', false, true);
            this.menu.nativeElement['MaterialMenu'].hide();
            this.input.nativeElement.dispatchEvent(evt);
        }
        else {
            this.input.nativeElement.fireEvent('onchange');
        }
    };
    MaterialAngularSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'material-angular-select',
                    template: "<div #dropdown class=\"mdl-textfield mdl-js-textfield material-angular-select\"\n     [class.is-focused]=\"isFocused\"\n     [class.mdl-textfield--floating-label]=\"isFloatingLabel\"\n     [class.material-angular-select__fix-height]=\"fixHeight\">\n  <input #input\n         (click)=\"onInputClick($event)\"\n         (keyup)=\"menuKeyDown($event)\"\n         (keydown)=\"keyDownTab($event)\"\n         (mouseenter)=\"isKeyNavigation = false;\"\n         class=\"mdl-textfield__input\" type=\"text\"\n         [id]=\"id\" tabindex=\"0\" readonly\n         [value]=\"(disabled)? '' : currentValue[keys.title]\"\n         [disabled]=\"disabled\"/>\n  <input #hiddenInput tabindex=\"-1\" type=\"hidden\" [name]=\"name\" [value]=\"(disabled) ? '': currentValue[keys.value]\"/>\n  <label class=\"mdl-textfield__label\" [for]=\"id\">{{ label }}</label>\n  <ul #menu class=\"mdl-menu mdl-menu--bottom-left mdl-js-menu\">\n    <li #li *ngFor=\"let item of dataArray; index as i;\" [attr.data-val]=\"item[keys.value]\" class=\"mdl-menu__item\"\n        (click)=\"setSelectedItem(item)\"\n        [ngClass]=\"{'is-item-hover': i === arrowkeyLocation && isKeyNavigation }\"\n        tabindex=\"-1\">\n      {{ item[keys.title] }}\n    </li>\n  </ul>\n  <label [for]=\"id\" (click)=\"onInputClick($event)\" *ngIf=\"arrow\">\n    <i #arrow class=\"mdl-icon-toggle__label material-icons\">arrow_drop_down</i>\n  </label>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["material-angular-select{display:block;outline:0;width:100%}material-angular-select .mdl-textfield__input{cursor:pointer}material-angular-select .mdl-textfield__input:focus{outline:0}material-angular-select .mdl-textfield__label::after{bottom:22px}material-angular-select label{display:block;margin-bottom:0}material-angular-select .mdl-icon-toggle__label{float:right;margin-top:-30px;color:rgba(0,0,0,.87);-webkit-transform:rotate(0);transform:rotate(0);transition:transform .3s;transition:transform .3s,-webkit-transform .3s}material-angular-select.is-focused .mdl-icon-toggle__label{color:#3f51b5;-webkit-transform:rotate(180deg);transform:rotate(180deg)}material-angular-select .is-item-hover{background-color:#eee}material-angular-select .mdl-menu__container{width:100%!important;margin-top:2px}material-angular-select .mdl-menu__container .mdl-menu{width:100%}material-angular-select .mdl-menu__container .mdl-menu .mdl-menu__item{font-size:16px}material-angular-select.has-placeholder .mdl-textfield__label,material-angular-select.is-dirty .mdl-textfield__label,material-angular-select.is-focused .mdl-textfield__label{color:#3f51b5}material-angular-select ::-webkit-scrollbar{width:.5rem;height:.5rem}material-angular-select ::-webkit-scrollbar-thumb{background:#666;cursor:pointer}material-angular-select ::-webkit-scrollbar-track{background:#999}.material-angular-select__fix-height .mdl-menu__container .mdl-menu{overflow-y:auto;max-height:288px!important}.material-angular-select__fix-height .mdl-menu.mdl-menu--top-left{bottom:auto;top:0}"]
                }] }
    ];
    /** @nocollapse */
    MaterialAngularSelectComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
    return MaterialAngularSelectComponent;
}());
export { MaterialAngularSelectComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtYW5ndWxhci1zZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWF0ZXJpYWwtYW5ndWxhci1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWwtYW5ndWxhci1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLCtCQUErQixDQUFDO0FBSXZDLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBRVQsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkI7SUEyQ0Usd0NBQTJCLGNBQWlDOztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFuQzVDLFNBQUksR0FBVSxFQUFFLENBQUM7UUFDakIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFakIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLFNBQUksR0FBRzs7WUFDckIsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztTQUNmLENBQUM7UUFDYyxpQkFBWTtZQUMxQixHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFHLEVBQUU7WUFDckIsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBRyxFQUFFO2dCQUNyQjtRQUVlLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVU1QyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNkLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFD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QUNyQywrQ0FBNkI7O0lBQzdCLDhDQUdFOztJQUNGLHNEQUdFOztJQUVGLHVEQUFvRDs7SUFFcEQsNENBQWtCOztJQUVsQixrREFBNEM7O0lBQzVDLCtDQUFzQzs7SUFDdEMscURBQWtEOztJQUNsRCw4Q0FBb0M7O0lBQ3BDLDhDQUFnRDs7Ozs7SUFFaEQsZ0RBQXVCOztJQUN2QixtREFBeUI7O0lBQ3pCLG1EQUFzQjs7Ozs7SUFDdEIsb0RBQTJCOzs7OztJQUMzQix1REFBMkI7O0lBQzNCLDBEQUE0Qjs7SUFDNUIseURBQStCOzs7OztJQUVaLHdEQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnbWF0ZXJpYWwtZGVzaWduLWxpdGUvbWF0ZXJpYWwnO1xuXG5kZWNsYXJlIHZhciBjb21wb25lbnRIYW5kbGVyOiBhbnk7XG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0ZXJpYWwtYW5ndWxhci1zZWxlY3QnLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gIHN0eWxlVXJsczogWycuL21hdGVyaWFsLWFuZ3VsYXItc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXRlcmlhbC1hbmd1bGFyLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbn0pXG5cbmV4cG9ydCBjbGFzcyBNYXRlcmlhbEFuZ3VsYXJTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBkYXRhOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBwdWJsaWMgbGFiZWwgPSAnJztcbiAgQElucHV0KCkgcHVibGljIG5hbWUgPSAnJztcbiAgQElucHV0KCkgcHVibGljIGZpeEhlaWdodCA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgaXNGbG9hdGluZ0xhYmVsID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBjbGFzc1N0eWxlOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgcHVibGljIGFycm93ID0gdHJ1ZTtcbiAgQElucHV0KCkgcHVibGljIGtleXMgPSB7IC8vIHJlcXVpcmVkIGlmIHVzZSBhcnJheSBvZiBvYmplY3Qgd2l0aCBkaWZmZXJlbnQgc3RydWN0dXJlXG4gICAgdmFsdWU6ICd2YWx1ZScsXG4gICAgdGl0bGU6ICd0aXRsZScsXG4gIH07XG4gIEBJbnB1dCgpIHB1YmxpYyBjdXJyZW50VmFsdWUgPSB7XG4gICAgW3RoaXMua2V5cy50aXRsZV06ICcnLFxuICAgIFt0aGlzLmtleXMudmFsdWVdOiAnJyxcbiAgfTtcblxuICBAT3V0cHV0KCkgcHVibGljIHNlbGVjdGVkVmFsdWUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGlkOiBzdHJpbmc7XG5cbiAgQFZpZXdDaGlsZCgnZHJvcGRvd24nKSBkcm9wZG93bjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnaGlkZGVuSW5wdXQnKSBoaWRkZW5JbnB1dDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbWVudScpIG1lbnU6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGRyZW4oJ2xpJykgbGlzdDogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIHByaXZhdGUgb3BlbmVkID0gZmFsc2U7XG4gIHB1YmxpYyBpc0ZvY3VzZWQgPSBmYWxzZTtcbiAgcHVibGljIGRhdGFBcnJheSA9IFtdO1xuICBwcml2YXRlIGlzVmlld0luaXQgPSBmYWxzZTtcbiAgcHJpdmF0ZSB0b2RvQWZ0ZXJJbml0ID0gW107XG4gIHB1YmxpYyBhcnJvd2tleUxvY2F0aW9uID0gMDtcbiAgcHVibGljIGlzS2V5TmF2aWdhdGlvbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuXG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pZCA9IGBpZC0ke3RoaXMubmFtZX0tJHtNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMDAgKyAxMDApfWA7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRhY2goKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ2NsYXNzU3R5bGUnKSkge1xuICAgICAgY2hhbmdlcy5jbGFzc1N0eWxlLmN1cnJlbnRWYWx1ZS5mb3JFYWNoKChzdHlsZSkgPT4ge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChzdHlsZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKSB7XG4gICAgICBpZiAoIXRoaXMuaXNWaWV3SW5pdCkge1xuICAgICAgICB0aGlzLnRvZG9BZnRlckluaXQucHVzaCh0aGlzLmxvYWREYXRhLmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdjdXJyZW50VmFsdWUnKSkge1xuICAgICAgaWYgKCF0aGlzLmlzVmlld0luaXQpIHtcbiAgICAgICAgdGhpcy50b2RvQWZ0ZXJJbml0LnB1c2godGhpcy5zZXRDdXJyZW50VmFsdWUuYmluZCh0aGlzLCBjaGFuZ2VzLmN1cnJlbnRWYWx1ZS5jdXJyZW50VmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFZhbHVlKGNoYW5nZXMuY3VycmVudFZhbHVlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJdGVtKHRoaXMuY3VycmVudFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ25hbWUnKSkge1xuICAgICAgdGhpcy5uYW1lID0gKHRoaXMubmFtZSA9PT0gJycpID8gdGhpcy5sYWJlbC5yZXBsYWNlKC9cXHMvZywgJycpIDogdGhpcy5uYW1lO1xuICAgIH1cbiAgICBjb21wb25lbnRIYW5kbGVyLnVwZ3JhZGVFbGVtZW50cyh0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDdXJyZW50VmFsdWUoaXRlbSkge1xuICAgIGlmICghaXRlbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IHtcbiAgICAgICAgW3RoaXMua2V5cy52YWx1ZV06IGl0ZW0sXG4gICAgICAgIFt0aGlzLmtleXMudGl0bGVdOiBpdGVtLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50VmFsdWUgPSBpdGVtO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZERhdGEoKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuZGF0YVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5kYXRhQXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLmRhdGFBcnJheS5wdXNoKHtcbiAgICAgICAgICAgIFt0aGlzLmtleXMudmFsdWVdOiBpdGVtLFxuICAgICAgICAgICAgW3RoaXMua2V5cy50aXRsZV06IGl0ZW0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmRhdGFbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMuZGF0YUFycmF5ID0gdGhpcy5kYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRpc2FibGVkID0gdGhpcy5kYXRhQXJyYXkubGVuZ3RoIDwgMSB8fCB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmlzVmlld0luaXQgPSB0cnVlO1xuICAgIHRoaXMudG9kb0FmdGVySW5pdC5mb3JFYWNoKGZ1bmMgPT4gZnVuYy5jYWxsKCkpO1xuICAgIHRoaXMudG9kb0FmdGVySW5pdCA9IFtdO1xuICAgIHRoaXMuc2V0U2VsZWN0ZWRJdGVtKHRoaXMuY3VycmVudFZhbHVlKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLnJlYXR0YWNoKCk7XG4gIH1cblxuICBwdWJsaWMgbWVudUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5pc0tleU5hdmlnYXRpb24gPSB0cnVlO1xuICAgIGNvbnN0IGlzVmlzaWJsZSA9IHRoaXMubWVudS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy12aXNpYmxlJyk7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM4OiAvLyBhcnJvdyB1cFxuICAgICAgICB0aGlzLmFycm93a2V5TG9jYXRpb24gPSB0aGlzLmFycm93a2V5TG9jYXRpb24gPiAwID8gdGhpcy5hcnJvd2tleUxvY2F0aW9uIC0gMSA6IHRoaXMuZGF0YUFycmF5Lmxlbmd0aCAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDogLy8gYXJyb3cgZG93blxuICAgICAgICB0aGlzLmFycm93a2V5TG9jYXRpb24gPSB0aGlzLmFycm93a2V5TG9jYXRpb24gPj0gKHRoaXMuZGF0YUFycmF5Lmxlbmd0aCAtIDEpID8gMCA6IHRoaXMuYXJyb3drZXlMb2NhdGlvbiArIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxMzogLy8gZW50ZXJcbiAgICAgICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFZhbHVlKHRoaXMuZGF0YVt0aGlzLmFycm93a2V5TG9jYXRpb25dKTtcbiAgICAgICAgICB0aGlzLmNsb3NlTWVudSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3Blbk1lbnUoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjc6IC8vIGVzY1xuICAgICAgICB0aGlzLmNsb3NlTWVudSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMga2V5RG93blRhYihldmVudCkge1xuICAgIGNvbnN0IGlzVmlzaWJsZSA9IHRoaXMubWVudS5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy12aXNpYmxlJyk7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDk6IC8vIHRhYlxuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZU1lbnUoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25JbnB1dENsaWNrKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaXNWaXNpYmxlID0gdGhpcy5tZW51Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXZpc2libGUnKTtcbiAgICB0aGlzLmhpZGVBbGxNZW51KCk7XG4gICAgaWYgKCFpc1Zpc2libGUpIHtcbiAgICAgIHRoaXMub3Blbk1lbnUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuTWVudSgpIHtcbiAgICB0aGlzLmFycm93a2V5TG9jYXRpb24gPSB0aGlzLmRhdGFBcnJheS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtW3RoaXMua2V5cy52YWx1ZV0gPT09IHRoaXMuY3VycmVudFZhbHVlW3RoaXMua2V5cy52YWx1ZV0pO1xuICAgIHRoaXMubWVudS5uYXRpdmVFbGVtZW50WydNYXRlcmlhbE1lbnUnXS5zaG93KCk7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VNZW51KCkge1xuICAgIHRoaXMuaGlkZUFsbE1lbnUoKTtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGhpZGVBbGxNZW51KCkge1xuICAgIGNvbnN0IGFsbFNlbGVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWF0ZXJpYWwtYW5ndWxhci1zZWxlY3QnKSBhcyBhbnk7XG4gICAgYWxsU2VsZWN0cy5mb3JFYWNoKChzZWxlY3Q6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBtZW51ID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJy5tZGwtanMtbWVudScpO1xuICAgICAgbWVudVsnTWF0ZXJpYWxNZW51J10uaGlkZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNldFNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgaWYgKCFpdGVtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFZhbHVlID0gaXRlbTtcbiAgICB0aGlzLnNlbGVjdGVkVmFsdWUuZW1pdChpdGVtKTtcbiAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuTWF0ZXJpYWxUZXh0ZmllbGQuY2hhbmdlKHRoaXMuY3VycmVudFZhbHVlW3RoaXMua2V5cy50aXRsZV0pOyAvLyBoYW5kbGVzIGNzcyBjbGFzcyBjaGFuZ2VzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuTWF0ZXJpYWxUZXh0ZmllbGQudXBkYXRlQ2xhc3Nlc18oKTsgLy8gdXBkYXRlIGNzcyBjbGFzc1xuICAgIH0sXG4gICAgICAgICAgICAgICAyNTApO1xuXG4gICAgaWYgKCdjcmVhdGVFdmVudCcgaW4gZG9jdW1lbnQpIHtcbiAgICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB0aGlzLm1lbnUubmF0aXZlRWxlbWVudFsnTWF0ZXJpYWxNZW51J10uaGlkZSgpO1xuICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZpcmVFdmVudCgnb25jaGFuZ2UnKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==