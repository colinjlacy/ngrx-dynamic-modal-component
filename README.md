# ngrx-dynamic-modal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Concept

The goal here was to enable, through service calls and `@ngrx/store`, a dynamic modal that populates its view with whatever `Component` it's configured to display.  This allows for the reuse of a container component, which can declare an API that devs can use to inject their various modal layouts and functionality.

It was heavily influenced by [a blog post on Rangle.io](http://blog.rangle.io/dynamically-creating-components-with-angular-2/), which speaks to this exact use case as a motivation for creating dynamic component injection. However I also took influence from [this post on Medium](https://medium.com/@tudorgergely/injecting-components-dynamically-in-angular-2-3d36594d49a0). This project extends the concepts these authors introduce by wiring in action handling, and setting the modal state through `@ngrx/store`.  

Ideally this would go on to be the basis for all of the various interactive elements in a shell layout - navigation toggles, loading indicators, etc.

## Key features

This solution allows a developer to declare how a modal should behave from the point of interaction.  The developer would leverage the `ModalService` to open a modal with a configuration as an argument.  That would then trigger an action against the `Store`, which would be reduced through an observable to data that the `DynamicModalComponent` can understand and digest.  The configuration that the dev would pass in looks something like this:
```
export interface iModalServiceOptions {
    component?: Type<Component>;
    modalData?: any;
    modalErrors?: any;
    actionContext?: any;
    positiveAction?: Function;
    negativeAction?: Function;
}
```

The `positiveAction` and `negativeAction` map to the positive and negative buttons one generally expects on a modal.  The `actionContext` is passed into a `call` that's run on these mapped actions, so that a developer can leverage the functional context of the service or component in which they're operating.

A `ModalView` class is offered to wire in subscribing and un-subscribing to the `modalData` and `modalError` properties of the options object as it's passed through the `Store`. Similar to the `BaseView` introduced in a previous project, the `ModalView` offers lifecycle hooks that a dev can hook into for `ngOnInit` and `ngOnDestroy`.  

## The (current) hangup

Unfortunately, due to the nature of how the `ComponentFactoryResolver` dynamically builds components, this PoC currently only works if the modal layout components are listed as `entryComponents` somewhere within their module hierarchy.  This isn't too terrible if you are creating components that you know will be modal layouts - you'd simply list them as `entryComponents` in the same `NgModule` in which you `declare` them.  In the examples in this demo, they're used as 'smart' components, or as I call them 'view components', so they're more likely to be application-specific. However there might be a bit more to it if you're building reusable components.
