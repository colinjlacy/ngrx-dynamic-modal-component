import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { Store } from '@ngrx/store';

import { BandMemberListingComponent } from '../components/band-member-listing.component';
import { SongListingComponent } from '../components/song-listing.component';
import { ModalService } from '../services/modal.service';
import { BaseView } from './base.view';

@Component({
    selector: 'first-page',
    template: `
    <h1>Second Page</h1>
    <h2>{{model.band.name}}</h2>
    <h3>Songs:</h3>
    <ul>
        <li *ngFor="let song of model.band.songs" (click)="routeToSong(song.id)">{{song.name}}</li>
    </ul>
    <button (click)="openSongListingModal()">View it in a modal!</button>
    <h3>Band members:</h3>
    <ul>
        <li *ngFor="let musician of model.band.members">{{musician}}</li>
    </ul>
    <button (click)="openBandMemberListingModal()">View it in a modal!</button>
    `,
    styles: [`.left-panel { width: 50%; }`]
})
export class BandDetailsView extends BaseView {

    constructor(public route:ActivatedRoute, private router: Router, public store: Store<any>, private modalSrvc: ModalService) {
        super(store, route);
    }

    routeToSong(id) {
        this.router.navigate(['/', 'band', this.model.band.id, 'song', id]);
    }

    openSongListingModal() {
        this.modalSrvc.openModal({
            component: SongListingComponent,
            modalData: this.model.band.songs,
            actionContext: this,
            positiveAction: this.routeToFirstSong
        });
    }

    openBandMemberListingModal() {
        this.modalSrvc.openModal({
            component: BandMemberListingComponent,
            modalData: this.model.band.members
        });
    }

    private routeToFirstSong(data) {
        if(!data) {
            this.modalSrvc.setConfiguration({modalErrors: {
                noSelectionError: 'You must choose a song if you would like to proceed!'
            }})
        } else {
            this.router.navigate(['/', 'band', this.model.band.id, 'song', 1]).then(() => this.modalSrvc.closeModal());
        }
    }
}
