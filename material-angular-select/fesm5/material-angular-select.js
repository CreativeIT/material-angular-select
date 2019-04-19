import 'material-design-lite/material';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, ViewChildren, ViewEncapsulation, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MaterialAngularSelectModule = /** @class */ (function () {
    function MaterialAngularSelectModule() {
    }
    MaterialAngularSelectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [MaterialAngularSelectComponent],
                    imports: [
                        CommonModule,
                    ],
                    exports: [MaterialAngularSelectComponent],
                },] }
    ];
    return MaterialAngularSelectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { MaterialAngularSelectComponent, MaterialAngularSelectModule };

//# sourceMappingURL=material-angular-select.js.map