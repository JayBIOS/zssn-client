/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/13/17.
 */
import _ from 'lodash';
import * as types from './types';
import API from '../API';

import { inventoryReset } from './inventory';

export function registerFormChanged(data) {
    return {
        type: types.REGISTER_FORM_CHANGED,
        data: data
    };
}

export function registerFormSending(bool) {
    return {
        type: types.REGISTER_FORM_SENDING,
        sending: bool
    }
}

export function toggleErrors(bool) {
    return {
        type: types.REGISTER_FORM_TOGGLE_ERRORS,
        showErrorMessage: bool
    };
}

export function changeErrors(errors) {
    return {
        type: types.REGISTER_FORM_CHANGE_ERRORS,
        errors: errors
    }
}

export function registerFormReset() {
    return {
        type: types.REGISTER_FORM_RESET
    }
}

export function registerFormDone(bool) {
    return {
        type: types.REGISTER_FORM_DONE,
        done: bool
    }
}

export function showErrors(errors) {
    return dispatch => {
        dispatch(toggleErrors(true));
        dispatch(changeErrors(errors));
    }
}

export function dismissErrors() {
    return dispatch => {
        dispatch(toggleErrors(false));
    }
}

export function registerFormSend(data) {
    return dispatch => {
        dispatch(registerFormSending(true));
        API.post('survivors', data)
            .then(response => {
                dispatch(registerFormReset());
                dispatch(inventoryReset());
                dispatch(registerFormDone(true));
            })
            .catch(e => {
                dispatch(registerFormSending(false));
            });
    }
}

export function registerFormChange(input) {
    return (dispatch, getState) => {
        const data = getState().registerFormReducer.data;
        const k = {};
        k[input.name] = input.value;
        const changedData = _.assign({}, data, k);
        dispatch(registerFormChanged(changedData));
    }
}