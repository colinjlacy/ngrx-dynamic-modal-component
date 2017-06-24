import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { COMPONENTS, SongListingComponent, BandMemberListingComponent } from './components/index';
import { ROUTES } from './routes/index';
import { VIEWS } from './views/index';
import { RESOLVES } from './resolves/index';
import { SERVICES } from './services/index';
import { model } from './reducers/model.reducer';
import { ui } from './reducers/ui.reducer';

@NgModule({
    declarations: [
        AppComponent,
        ...VIEWS,
        ...COMPONENTS,
        SongListingComponent,
        BandMemberListingComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(ROUTES),
        StoreModule.provideStore({model, ui})
    ],
    providers: [
        ...RESOLVES,
        ...SERVICES
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        SongListingComponent,
        BandMemberListingComponent
    ]
})
export class AppModule {
}
