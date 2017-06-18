/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 14/06/17.
 */
import _ from 'lodash';
import * as types from './types';

export function survivorLocationChanged(data) {
    return {
        type: types.SURVIVOR_LOCATION_CHANGED,
        data: data
    };
}

export function survivorLocationFound(coordinates) {
    return (dispatch, getState) => {
        const data = getState().registerFormReducer.data;
        const k = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            hasCoordinates: true
        };
        const changedData = _.assign({}, data, k);
        dispatch(survivorLocationChanged(changedData));
    }
}