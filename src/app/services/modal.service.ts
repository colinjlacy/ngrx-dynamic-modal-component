import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { iModalServiceOptions } from '../models/modal.models';

@Injectable()
export class ModalService {

    actionData: any;

    constructor(private store: Store<any>) {}

    openModal(opts: iModalServiceOptions) {
        this.store.dispatch({type: 'OPEN_MODAL', payload: Object.assign({}, {open: true}, opts)});
    }

    closeModal() {
        this.actionData = null;
        this.store.dispatch({type: 'CLOSE_MODAL'});
    }

    setConfiguration(opts: iModalServiceOptions) {
        this.store.dispatch({type: 'SET_MODAL', payload: opts});
    }

    get data() {
        return this.actionData;
    }

    set data(data) {
        this.actionData = data;
    }
}
