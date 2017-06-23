import { Component } from '@angular/core';

@Component({
    selector: 'band-member-listing',
    template: `
    <h3>Band members:</h3>
    <ul>
        <li *ngFor="let musician of members">{{musician}}</li>
    </ul>
    `
})
