/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/13/17.
 */
import * as types from '../actions/types';

const INITIAL_STATE = {
    statistics: {
        infected: 0,
        lost: 0.00
    },
    fetching: false
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.STATISTICS_FETCHING:
            return {
                ...state,
                fetching: action.fetching
            };
        case types.STATISTICS_FETCH_SUCCESS:
            return {
                ...state,
                statistics: action.statistics
            };
        case types.STATISTICS_FETCH_FAIL:
            return  {
                ...state,
                statistics: INITIAL_STATE.statistics
            };
        default:
            return state;
    }
}