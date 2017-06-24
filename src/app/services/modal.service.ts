import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { iModalServiceOptions } from '../models/modal.models';

@Injectable()
export class ModalService {

    constructor(private store: Store<any>) {}

    openModal(opts: iModalServiceOptions) {
        this.store.dispatch({type: 'OPEN_MODAL', payload: Object.assign({}, {open: true}, opts)});
    }

    closeModal() {
        this.store.dispatch({type: 'CLOSE_MODAL'});
    }

}
