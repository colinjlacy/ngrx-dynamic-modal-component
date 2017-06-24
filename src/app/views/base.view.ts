import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { iViewHooks } from '../models/view-hooks.models';

export interface iBaseViewOptions {
    preserveData?: boolean,
    preserveKeys?: string[]
}

export class BaseView {
    model: any;
    viewHooks: iViewHooks;

    private modelSubscription: any;

    constructor(public store: Store<any>, public route: ActivatedRoute, private options: iBaseViewOptions = {preserveData: false, preserveKeys: []}) {
        this.viewHooks = {
            context: null,
            initHooks: [],
            destroyHooks: []
        };
    }

    ngOnInit() {
        this.modelSubscription = this.store.select('model')
            .subscribe(val => {
                this.model = val;
            });
        this.viewHooks.initHooks.forEach((hook: any) => {
            hook.action.call(this.viewHooks.context || this, ...hook.arguments);
        });
    }

    ngOnDestroy() {
        if(!this.options.preserveData) {
            let viewDependencyKeys = Object.keys(this.route.routeConfig['dependencies']);
            this.options.preserveKeys.forEach(key => {
                viewDependencyKeys.splice(viewDependencyKeys.indexOf(key), 1);
            });
            this.store.dispatch({type: 'REMOVE_DEPENDENCIES', payload: viewDependencyKeys});
            this.modelSubscription.unsubscribe();
        }
        this.viewHooks.destroyHooks.forEach((hook: {action: Function, arguments?: any[]}) => {
            hook.action.call(this.viewHooks.context || this, ...hook.arguments);
        });
    }
}
