import { Component, Injector } from '@angular/core';

@Component({
    selector: 'band-member-listing',
    template: `
    <h3>Songs:</h3>
    <ul>
        <li *ngFor="let song of modalData">{{song.name}}</li>
    </ul>
    `
})
export class SongListingComponent {
    modalData: any;

    constructor(private injector: Injector) {}

    ngOnInit() {
        this.modalData = this.injector.get('modalData');
    }
}
