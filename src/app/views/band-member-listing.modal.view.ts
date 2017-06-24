import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ModalService } from '../services/modal.service';
import { ModalView } from '../views/modal.view';

@Component({
    selector: 'band-member-listing',
    template: `
    <h3>Band members:</h3>
    <ul>
        <li *ngFor="let musician of modalData">{{musician}}</li>
    </ul>
    `
})
export class BandMemberListingComponent extends ModalView{

    constructor(public store: Store<any>, public modalSrvc: ModalService) {
        super(store, modalSrvc);
    }

}
