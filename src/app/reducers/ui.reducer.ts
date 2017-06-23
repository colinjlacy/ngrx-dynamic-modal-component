import { Action } from '@ngrx/store';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const ui = (state: any = {modal: {open: false}}, action: {type: string, payload?: any} = {type: null}) => {
    switch (action.type) {

        case OPEN_MODAL:
            return Object.assign({}, state, {modal: {open: true}});

        case CLOSE_MODAL:
            return Object.assign({}, state, {modal: {open: false}});

        default:
            return state;
    }
};
