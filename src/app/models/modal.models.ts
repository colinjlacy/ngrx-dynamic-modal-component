import { Component } from '@angular/core';

export interface iModalConfiguration {
    open: boolean;
    component: Component;
    modalData: any;
    positiveAction?: Function;
    negativeAction?: Function;
}

export interface iModalServiceOptions {
    component: Component;
    modalData: any;
    positiveAction?: Function;
    negativeAction?: Function;
}
