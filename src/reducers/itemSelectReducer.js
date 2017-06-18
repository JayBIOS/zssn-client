/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import * as types from '../actions/types';

const INITIAL_STATE = {
    selected: ''
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.ITEM_SELECTED:
            return {
                ...state,
                selected: action.item
            };
        default:
            return state
    }
}
