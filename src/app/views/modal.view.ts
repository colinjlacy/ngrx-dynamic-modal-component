import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ModalService } from '../services/modal.service';
import { iModalConfiguration } from '../models/modal.models';
import { iViewHooks } from '../models/view-hooks.models';

export class ModalView {
    modalData: any;
    modalErrors: any;
    viewHooks: iViewHooks;

    private modalSubscription: any;

    constructor(public store: Store<any>, public modalSrvc: ModalService) {
        this.viewHooks = {
            context: null,
            initHooks: [],
            destroyHooks: []
        };
    }

    ngOnInit() {
        this.modalSubscription = this.store.select('ui')
            .map((val: {modal: iModalConfiguration}) => val.modal)
            .subscribe((val: iModalConfiguration) => {
                if(val) {
                    this.modalData = val.modalData;
                    this.modalErrors = val.modalErrors;
                }
            });
        this.viewHooks.initHooks.forEach((hook: any) => {
            hook.action.call(this.viewHooks.context || this, ...hook.arguments);
        });
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
        this.viewHooks.destroyHooks.forEach((hook: {action: Function, arguments?: any[]}) => {
            hook.action.call(this.viewHooks.context || this, ...hook.arguments);
        });
    }

}
