import { Component, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: `dynamic-modal`,
    template: `
        <div #dynamicComponentContainer></div>
    `
})
export class DynamicModalComponent {
    configuration: any;
    storeSubscription: any;

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver, private store: Store) {}

    ngOnInit() {
        this.storeSubscription = this.store.select('ui')
            .subscribe(val => this.configuration = val.modal);
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe();
    }
}
