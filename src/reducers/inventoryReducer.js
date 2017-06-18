/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import * as types from '../actions/types';

const INITIAL_STATE = {
    inventory: []
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.INVENTORY_CHANGE:
            return {
                ...state,
                inventory: action.inventory
            };
        case types.INVENTORY_RESETED:
            return INITIAL_STATE;
        default:
            return state;
    }
}
