/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import { itemsFetch } from '../../actions/items';
import { itemSelected } from '../../actions/itemSelect';

const mapStateToProps = state => {
    return {
        items: state.itemsReducer.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchItems: () => dispatch(itemsFetch()),
        selectItem: (item) => dispatch(itemSelected(item))
    }
};

class ItemSelect extends React.Component {
    componentDidMount() {
        this.props.fetchItems();
    }

    handleSelection(e, data) {
        const item = _.find(this.props.items, function(i) {
            return i.name === data.value;
        });
        this.props.selectItem(item);
    }

    isEmpty() {
        return this.props.items.length < 1;
    }

    render() {
        const toOptions = item => {
            return {
                key: item.name,
                value: item.name,
                text: item.name,
            };
        };

        const transformed = _.sortBy(_.map(this.props.items, toOptions),
            [function(o) { return o.text; }]);

        return (
            <div className="zssn-item-search">
                <Dropdown placeholder="Add an item"
                          search selection
                          selectOnBlur={false}
                          value=""
                          disabled={this.isEmpty()}
                          onChange={this.handleSelection.bind(this)}
                          options={transformed}/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemSelect));