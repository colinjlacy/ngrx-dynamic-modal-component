import { Component, Injector } from '@angular/core';

@Component({
    selector: 'band-member-listing',
    template: `
    <h3>Band members:</h3>
    <ul>
        <li *ngFor="let musician of modalData">{{musician}}</li>
    </ul>
    `
})
export class BandMemberListingComponent {
    modalData: any;

    constructor(private injector: Injector) {
        this.modalData = this.injector.get('modalData');
        console.log(this.modalData);
    }

    ngOnInit() {
    }
}
