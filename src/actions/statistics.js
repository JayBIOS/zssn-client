/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/13/17.
 */
import * as types from './types';
import API from '../API';

export function statisticsFetching(bool) {
    return {
        type: types.STATISTICS_FETCHING,
        fetching: bool
    };
}

export function statisticsFetchSuccess(statistics) {
    return {
        type: types.STATISTICS_FETCH_SUCCESS,
        statistics
    };
}

export function statisticsFetchFail() {
    return {
        type: types.STATISTICS_FETCH_FAIL
    }
}

export function statisticsFetch() {
    return dispatch => {
        dispatch(statisticsFetching(true));

        API.get('reports/infected')
            .then(response => {
                const statistics = { infected: response.data.percentage };

                API.get('reports/points_lost')
                    .then(response => {
                        statistics['lost'] = response.data.points_lost;
                        dispatch(statisticsFetching(false));
                        dispatch(statisticsFetchSuccess(statistics));
                    })
                    .catch(() => {
                        dispatch(statisticsFetchFail());
                        dispatch(statisticsFetching(false));
                    });
            })
            .catch(() => {
                dispatch(statisticsFetchFail());
                dispatch(statisticsFetching(false));
            });
    }
}