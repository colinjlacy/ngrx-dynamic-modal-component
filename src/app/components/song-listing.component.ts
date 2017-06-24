import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ModalService } from '../services/modal.service';

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
export class SongListingComponent {
    modalData: any;
    modalErrors: any;
    modalSubscription: any;
    modalViewHooks: {
        context: any,
        initHooks: Array<{action: Function, arguments?: any[]}>,
        destroyHooks: Array<{action: Function, arguments?: any[]}>
    };

    constructor(private store: Store<any>, private modalSrvc: ModalService) {
        this.modalViewHooks = {
            context: null,
            initHooks: [],
            destroyHooks: []
        };
    }

    ngOnInit() {
        this.modalSubscription = this.store.select('ui')
            .subscribe(val => {
                if(val['modal']) {
                    this.modalData = val['modal']['modalData'];
                    this.modalErrors = val['modal']['modalErrors'];
                }
            });
        this.modalViewHooks.initHooks.forEach((hook: any) => {
            hook.action.call(this.modalViewHooks.context || this, ...hook.arguments);
        });
    }

    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
        this.modalViewHooks.destroyHooks.forEach((hook: {action: Function, arguments?: any[]}) => {
            hook.action.call(this.modalViewHooks.context || this, ...hook.arguments);
        });
    }

    setSelected(id) {
        this.modalErrors = {};
        this.modalSrvc.data = id;
    }

}
