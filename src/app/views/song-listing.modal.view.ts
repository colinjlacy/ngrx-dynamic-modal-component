import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ModalService } from '../services/modal.service';
import { ModalView } from '../views/modal.view';

@Component({
    selector: 'band-member-listing',
    template: `
    <h3>Songs:</h3>
    <p *ngIf="modalErrors && modalErrors.noSelectionError"><strong>{{modalErrors.noSelectionError}}</strong></p>
    <form>
        <label *ngFor="let song of modalData">
            <input type="radio" name="selectedSong" [value]="song.id" (change)="setSelected(song.id)"> {{song.name}}
        </label>
    </form>
    `,
    styles: [`label {display: block;}`]
})
export class SongListingComponent extends ModalView{

    constructor(public store: Store<any>, public modalSrvc: ModalService) {
        super(store, modalSrvc);
    }

    setSelected(id) {
        this.modalErrors = {};
        this.modalSrvc.data = id;
    }
}
