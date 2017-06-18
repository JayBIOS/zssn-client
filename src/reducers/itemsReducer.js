/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import * as types from '../actions/types';

const INITIAL_STATE = {
    items: [],
    fetching: false
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.ITEMS_FETCHING:
            return {
                ...state,
                fetching: action.fetching
            };
        case types.ITEMS_CHANGE:
        case types.ITEMS_FETCH_SUCCESS:
            return {
                ...state,
                items: action.items
            };
        case types.ITEMS_FETCH_FAIL:
            return  {
                ...state,
                items: []
            };
        default:
            return state
    }
}
