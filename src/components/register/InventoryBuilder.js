/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Label, Menu, Table, Input, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import ItemSelect from './ItemSelect';
import { inventoryChangeQuantity, inventoryRemoveItem } from '../../actions/inventory';

const mapStateToProps = state => {
    return {
        inventory: state.inventoryReducer.inventory
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeQuantity: item => dispatch(inventoryChangeQuantity(item)),
        removeItem: item => dispatch(inventoryRemoveItem(item))
    }
};

class InventoryBuilder extends React.Component {
    changeItemQuantity(e, data) {
        this.props.changeQuantity({name: data['data-key'], quantity: parseInt(data.value)});
    }

    removeItem(e, data) {
        const item = _.find(this.props.inventory, function(i) {
            return i.name === data['data-key'];
        });
        this.props.removeItem(item);
    }

    render() {
        const toRow = item => {
            return (
                <Table.Row key={item.name}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>
                        <Input value={item.quantity}
                               type="number" min='1'
                               data-key={item.name}
                               fluid
                               onChange={this.changeItemQuantity.bind(this)}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Button icon="trash"
                                type="button"
                                data-key={item.name}
                                fluid
                                onClick={this.removeItem.bind(this)}/>
                    </Table.Cell>
                </Table.Row>
            );
        };

        const worth = _.sumBy(this.props.inventory, function(i) {
            return i.worth * i.quantity;
        });

        return (
            <div className="zssn-inventory-builder">
                <Menu attached="top" stackable>
                    <Menu.Item header className="borderless">
                        Inventory
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <ItemSelect/>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Table attached basic={true} padded={true}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Quantity</Table.HeaderCell>
                            <Table.HeaderCell width={2}/>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(this.props.inventory, toRow)}
                    </Table.Body>
                </Table>
                <Segment size="small" attached="bottom" textAlign="left">
                    <Label attached="bottom">
                        Worth
                        <Label.Detail>
                            <Icon name="bitcoin"/>
                            {worth.toFixed(2)}
                        </Label.Detail>
                    </Label>
                </Segment>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InventoryBuilder));