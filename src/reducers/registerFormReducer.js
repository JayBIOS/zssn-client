/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/13/17.
 */
import * as types from '../actions/types';

const INITIAL_STATE = {
    data: {
        name: '',
        age: '',
        latitude: '38.961956',
        longitude: '-77.027346',
        gender: '',
        hasCoordinates: false
    },
    sending: false,
    done: false,
    errors: {
        name: null,
        age: null,
        latitude: null,
        longitude: null,
        gender: null
    },
    showErrorMessage: false
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.REGISTER_FORM_DONE:
            return {
                ...state,
                done: action.done
            };
        case types.SURVIVOR_LOCATION_CHANGED:
        case types.REGISTER_FORM_CHANGED:
            return {
                ...state,
                data: action.data
            };
        case types.REGISTER_FORM_SENDING:
            return {
                ...state,
                sending: action.sending
            };
        case types.REGISTER_FORM_TOGGLE_ERRORS:
            return {
                ...state,
                showErrorMessage: action.showErrorMessage
            };
        case types.REGISTER_FORM_CHANGE_ERRORS:
            return {
                ...state,
                errors: action.errors
            };
        case types.REGISTER_FORM_RESET:
            return {
                ...INITIAL_STATE,
                data: {
                    ...INITIAL_STATE.data,
                    latitude: state.data.latitude,
                    longitude: state.data.longitude,
                    hasCoordinates: state.data.hasCoordinates
                }
            };
        default:
            return state;
    }
}