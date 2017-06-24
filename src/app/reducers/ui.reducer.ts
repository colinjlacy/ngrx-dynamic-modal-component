import { Action } from '@ngrx/store';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_MODAL = 'SET_MODAL';

export function ui (state: any = {modal: {open: false}}, action: {type: string, payload?: any} = {type: null}) {
    switch (action.type) {

        case OPEN_MODAL:
            return Object.assign({}, state, {modal: action.payload});

        case CLOSE_MODAL:
            return Object.assign({}, state, {modal: {open: false}});

        case SET_MODAL:
            let result = Object.assign({}, state, {modal: Object.assign({}, state.modal, action.payload)});
            console.log('resulting modal configuration', result);
            return Object.assign({}, state, {modal: Object.assign({}, state.modal, action.payload)});

        default:
            return state;
    }
};
