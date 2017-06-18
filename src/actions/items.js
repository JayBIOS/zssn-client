/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import * as types from './types';
import API from '../API';

export function itemsFetching(bool) {
    return {
        type: types.ITEMS_FETCHING,
        fetching: bool
    };
}

export function itemsFetchSuccess(items) {
    return {
        type: types.ITEMS_FETCH_SUCCESS,
        items
    };
}

export function itemsChange(items) {
    return {
        type: types.ITEMS_CHANGE,
        items
    };
}

export function itemsFetchFail() {
    return {
        type: types.ITEMS_FETCH_FAIL
    }
}

export function itemsFetch() {
    return dispatch => {
        dispatch(itemsFetching(true));

        API.get('items')
            .then(response => {
                const items = response.data;
                dispatch(itemsFetching(false));
                dispatch(itemsFetchSuccess(items));
            })
            .catch(() => {
                dispatch(itemsFetchFail());
            });
    }
}
