/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/17/17.
 */
import * as types from '../actions/types';

const INITIAL_STATE = {
    survivors: [],
    fetching: false
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.SURVIVORS_FETCHING:
            return {
                ...state,
                fetching: action.fetching
            };
        case types.SURVIVORS_FETCH_SUCCESS:
            return {
                ...state,
                survivors: action.survivors
            };
        case types.SURVIVORS_FETCH_FAIL:
            return  {
                ...state,
                survivors: INITIAL_STATE.survivors
            };
        default:
            return state;
    }
}