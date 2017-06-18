/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/17/17.
 */
import * as types from './types';
import API from '../API';

export function survivorsFetching(bool) {
    return {
        type: types.SURVIVORS_FETCHING,
        fetching: bool
    };
}

export function survivorsFetchSuccess(survivors) {
    return {
        type: types.SURVIVORS_FETCH_SUCCESS,
        survivors
    };
}

export function survivorsFetchFail() {
    return {
        type: types.SURVIVORS_FETCH_FAIL
    }
}

export function survivorsFetch() {
    return dispatch => {
        dispatch(survivorsFetching(true));

        API.get('survivors')
            .then(response => {
                dispatch(survivorsFetchSuccess(response.data));
                dispatch(survivorsFetching(false));
            })
            .catch((e) => {
            console.log(e);
                dispatch(survivorsFetchFail());
                dispatch(survivorsFetching(false));
            });
    }
}