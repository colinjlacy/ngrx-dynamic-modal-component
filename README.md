# ngrx-dynamic-modal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Concept

The goal here was to enable, through service calls and `@ngrx/store`, a dynamic modal that populates its view with whatever `Component` it's configured to display.  This allows for the reuse of a container component, which can declare an API that devs can use to inject their various modal layouts and functionality.

It was heavily influenced by [a blog post on Rangle.io](http://blog.rangle.io/dynamically-creating-components-with-angular-2/), which speaks to this exact use case as a motivation for creating dynamic component injection.  This project extends the demo created in that post by wiring in action handling, and setting the modal state through `@ngrx/store`.  

Ideally this would go on to be the basis for all of the various interactive elements in a presentation layout - navigation toggles, loading indicators, etc.

## Key features

This solution allows a developer to declare how a modal should behave from the point of interaction.  The developer would leverage the `ModalService` to open a modal with a configuration as an argument.  That would then trigger an action against the `Store`, which would be reduced through an observable to data that the `DynamicModalComponent` can understand and digest.  The configuration that the dev would pass in looks something like this:
```
export interface iModalServiceOptions {
    component?: Component;
    modalData?: any;
    actionContext?: any;
    positiveAction?: Function;
    negativeAction?: Function;
}
```

## The (current) hangup

Unfortunately, due to the nature of how the `ComponentFactoryResolver` dynamically builds components, this PoC currently only works if the modal layout components are listed as `entryComponents` somewhere within their module hierarchy.  This isn't too terrible if you are creating components that you know will be modal layouts - you'd simply list them as `entryComponents` in the same `NgModule` in which you `declare` them.  However there might be a bit more to it if you're building reusable components.
