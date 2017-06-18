/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import { combineReducers } from 'redux';

import itemsReducer from './itemsReducer';
import itemSelectReducer from './itemSelectReducer';
import inventoryReducer from './inventoryReducer';
import statisticsReducer from './statisticsReducer';
import registerFormReducer from './registerFormReducer';
import survivorsReducer from './survivorsReducer';

export default combineReducers({
    itemsReducer,
    itemSelectReducer,
    inventoryReducer,
    statisticsReducer,
    registerFormReducer,
    survivorsReducer
});
