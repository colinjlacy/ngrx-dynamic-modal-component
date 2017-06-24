import { Component, Type } from '@angular/core';

export interface iModalServiceOptions {
    component?: Type<Component>;
    modalData?: any;
    modalErrors?: any;
    actionContext?: any;
    positiveAction?: Function;
    negativeAction?: Function;
}

export interface iModalConfiguration extends iModalServiceOptions {
    open: boolean;
}

