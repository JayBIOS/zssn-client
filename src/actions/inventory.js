/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import _ from 'lodash';
import * as types from './types';

import { itemsChange } from './items';

export function inventoryChange(inventory) {
    return {
        type: types.INVENTORY_CHANGE,
        inventory: inventory
    };
}

export function inventoryReseted() {

    return {
        type: types.INVENTORY_RESETED
    };
}

export function inventoryReset() {
    return (dispatch, getState) => {
        const inventory = getState().inventoryReducer.inventory;
        const items = getState().itemsReducer.items;

        const changedItems = _.concat(items, inventory);
        const sortedItems = _.sortBy(changedItems, function(i) {
            return i.text;
        });

        dispatch(itemsChange(sortedItems));
        dispatch(inventoryReseted());
    }
}

export function inventoryRemoveItem(item) {
    return (dispatch, getState) => {
        const inventory = getState().inventoryReducer.inventory;
        const items = getState().itemsReducer.items;
        const changedInventory = _.filter(inventory, function(i) {
            return i.name !== item.name;
        });
        const changedItems = _.concat(items, [{name: item.name, value: item.worth}]);
        const sortedItems = _.sortBy(changedItems, function(i) {
            return i.text;
        });
        dispatch(inventoryChange(changedInventory));
        dispatch(itemsChange(sortedItems));
    };
}

export function inventoryChangeQuantity(item) {
    return (dispatch, getState) => {
        const inventory = getState().inventoryReducer.inventory;
        const changedInventory = _.map(inventory, function(i) {
            if (i.name === item.name)
                i.quantity = item.quantity;
            return i;
        });
        dispatch(inventoryChange(changedInventory));
    };
}
