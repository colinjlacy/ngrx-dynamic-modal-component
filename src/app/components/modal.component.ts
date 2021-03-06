import { Component, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, ComponentRef, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { iModalConfiguration } from '../models/modal.models';
import { ModalService } from '../services/modal.service';

@Component({
    selector: `dynamic-modal`,
    template: `
        <div>
            <div class="backdrop"></div>
            <div class="modal-container">
                <div #dynamicComponentContainer></div>
                <div class="modal-footer" *ngIf="configuration">
                    <button class="modal-button" (click)="positiveAction()" *ngIf="!!configuration.positiveAction">Save</button>
                    <button class="modal-button" (click)="negativeAction()">Close</button>
                </div>
            </div>
        </div>
    `,
    styles: [
        `:host {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: none
        }`,
        `:host(.open) {
            display: block
        }`,
        `.backdrop {
            position: absolute;
            background: rgba(0,0,0,.6);
            z-index: 100;
            width: 100%;
            height: 100%;
        }`,
        `.modal-container {
            position: absolute;
            background: white;
            display: block;
            z-index: 200;
            padding: 10px;
            width: 400px;
            height: auto;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }`,
        `.dynamic-content-container,
        .modal-footer {
            display: block;
            padding: 10px;
        }`,
        `.modal-button {
            display: inline-block;
            padding: 5px 7px;
            margin-right: 5px;
        }`
    ]
})
export class DynamicModalComponent {
    configuration:iModalConfiguration;
    storeSubscription:any;
    currentComponent:ComponentRef<any> = null;

    @ViewChild('dynamicComponentContainer', {read: ViewContainerRef}) dynamicComponentContainer:ViewContainerRef;

    @HostBinding('class.open') open:boolean = false;

    constructor(private resolver:ComponentFactoryResolver, private store:Store<any>, private modalSrvc:ModalService) {}

    ngOnInit() {
        console.log(this.dynamicComponentContainer);
        this.storeSubscription = this.store.select('ui')
            .map((raw: {modal: iModalConfiguration}) => raw.modal)
            .subscribe((val: iModalConfiguration) => {

                if (!val.open || !val.component) {

                    this.open = false;
                    if (this.currentComponent) this.currentComponent.destroy();
                    this.configuration = val;
                    return;

                } else if(!!this.configuration && this.configuration.open === val.open) {

                    this.configuration = val;
                    return;

                }

                this.configuration = val;

                this.open = this.configuration.open;

                const factory = this.resolver.resolveComponentFactory(this.configuration.component);

                this.currentComponent = this.dynamicComponentContainer.createComponent(factory);
            });
    }

    ngOnDestroy() {
        this.storeSubscription.unsubscribe();
    }

    negativeAction() {
        if (this.configuration.negativeAction) {
            this.configuration.negativeAction.apply(this.configuration.actionContext, [this.modalSrvc.data]);
        } else {
            this.modalSrvc.closeModal();
        }
    }

    positiveAction() {
        if (this.configuration.positiveAction) {
            this.configuration.positiveAction.apply(this.configuration.actionContext, [this.modalSrvc.data]);
        } else {
            this.modalSrvc.closeModal();
        }
    }
}
