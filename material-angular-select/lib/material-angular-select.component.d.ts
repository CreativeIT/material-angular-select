import 'material-design-lite/material';
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
export declare class MaterialAngularSelectComponent implements OnInit, OnChanges, AfterViewInit {
    private changeDetector;
    data: any[];
    label: string;
    name: string;
    fixHeight: boolean;
    isFloatingLabel: boolean;
    disabled: boolean;
    classStyle: string[];
    arrow: boolean;
    keys: {
        value: string;
        title: string;
    };
    currentValue: {
        [x: string]: string;
    };
    selectedValue: EventEmitter<{}>;
    id: string;
    dropdown: ElementRef;
    input: ElementRef;
    hiddenInput: ElementRef;
    menu: ElementRef;
    list: QueryList<ElementRef>;
    private opened;
    isFocused: boolean;
    dataArray: any[];
    private isViewInit;
    private todoAfterInit;
    arrowkeyLocation: number;
    isKeyNavigation: boolean;
    constructor(changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private setCurrentValue;
    private loadData;
    ngAfterViewInit(): void;
    menuKeyDown(event: KeyboardEvent): void;
    keyDownTab(event: any): void;
    onInputClick(e: any): void;
    private openMenu;
    private closeMenu;
    private hideAllMenu;
    setSelectedItem(item: any): void;
}
