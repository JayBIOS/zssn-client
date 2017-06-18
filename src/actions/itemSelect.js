/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import _ from 'lodash';

import { inventoryChange } from './inventory';
import { itemsChange } from './items';

export function itemSelected(item) {
    return (dispatch, getState) => {
        const inventory = _.concat(getState().inventoryReducer.inventory,
                                   [{name: item.name, quantity: 1, worth: item.value}]);

        const items = getState().itemsReducer.items;
        const sortedInventory = _.sortBy(inventory, [function(i) { return i.name; }]);
        const changedItems = _.filter(items, function (i) { return i.name !== item.name });

        dispatch(itemsChange(changedItems));
        dispatch(inventoryChange(sortedInventory));
    };
}
