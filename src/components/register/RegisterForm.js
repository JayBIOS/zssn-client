/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/13/17.
 */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment, Message, Input, Select, Rail } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import InventoryBuilder from '../register/InventoryBuilder';
import CoordinatesInput from '../register/CoordinatesInput';
import { registerFormChange, registerFormSend, showErrors, dismissErrors } from '../../actions/registerForm';

const mapStateToProps = state => {
    return {
        data: state.registerFormReducer.data,
        inventory: state.inventoryReducer.inventory,
        sending: state.registerFormReducer.sending,
        errors: state.registerFormReducer.errors,
        showErrorMessage: state.registerFormReducer.showErrorMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        formChange: input => dispatch(registerFormChange(input)),
        register: data => dispatch(registerFormSend(data)),
        showErrors: errors => dispatch(showErrors(errors)),
        dismissErrors: () => dispatch(dismissErrors())
    }
};

class RegisterForm extends React.Component {
    isValid() {
        const errors = {
            name: null,
            age: null,
            latitude: null,
            longitude: null,
            gender: null
        };

        let hasErrors = false;

        if (!/^[A-zÀ-ÿ\s]*$/.test(this.props.data.name.trim())) {
            errors.name = 'Name must contain only letters.';
            hasErrors = true;
        }

        if (this.props.data.hasCoordinates) {
            if (!/^[+-]?\d+(\.\d+)?$/.test(this.props.data.latitude.trim())) {
                errors.latitude = 'Latitude must be a decimal number.';
                hasErrors = true;
            }

            if (!/^[+-]?\d+(\.\d+)?$/.test(this.props.data.longitude.trim())) {
                errors.longitude = 'Longitude must be a decimal number.';
                hasErrors = true;
            }
        }

        if (hasErrors)
            this.props.showErrors(errors);

        return !hasErrors;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.isValid()) {
            return;
        }

        const data = {
            name: this.props.data.name.trim(),
            age: this.props.data.age.trim(),
            gender: this.props.data.gender
        };

        if (this.props.data.hasCoordinates) {
            data['last_location'] = this.props.data.latitude.trim() +
                                    ',' +
                                    this.props.data.longitude.trim();
        }

        const inventory = _.join(_.map(this.props.inventory, item => {
            return item.name + ':' + item.quantity;
        }), ',');

        data['inventory'] = inventory;

        this.props.register(data);
    }

    handleDismiss(e) {
        this.props.dismissErrors();
    }

    handleChange(e, { name, value }) {
        this.props.formChange({name: name, value: value});
    }

    render() {
        const genders = [
            {key: 'male', value: 'male', text: 'Male', icon: 'man'},
            {key: 'female', value: 'female', text: 'Female', icon: 'woman'}
        ];

        return (
            <div className="zssn-register-form">
                <Message error
                         header="There was some errors with your submission"
                         list={Object.values(this.props.errors)}
                         onDismiss={this.handleDismiss.bind(this)}
                         hidden={!this.props.showErrorMessage}/>

                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Segment stacked={true}>
                        <Rail position="left">
                            <Segment>
                                <CoordinatesInput/>
                            </Segment>
                        </Rail>

                        <Form.Field inline>
                            <Input label={{ content: 'Name', color: this.props.errors.name ? 'red' : null }}
                                   name="name"
                                   placeholder="Are you Negan?"
                                   value={this.props.data.name}
                                   error={this.props.errors.name !== null}
                                   onChange={this.handleChange.bind(this)}
                                   fluid
                                   required/>
                        </Form.Field>
                        <Form.Group widths="equal">
                            <Form.Field>
                                <Input type="number"
                                       min={0}
                                       fluid
                                       label="Age"
                                       name="age"
                                       placeholder="Type your age..."
                                       value={this.props.data.age}
                                       onChange={this.handleChange.bind(this)}
                                       required/>
                            </Form.Field>
                            <Form.Field>
                                <Select placeholder="Select your gender..."
                                        name="gender"
                                        value={this.props.data.gender}
                                        onChange={this.handleChange.bind(this)}
                                        options={genders}
                                        required/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <InventoryBuilder/>
                        </Form.Field>
                        <Button className="zssn-primary-button"
                                fluid={true}
                                type='submit'
                                loading={this.props.sending}
                                disabled={this.props.sending}>Submit</Button>
                    </Segment>
                </Form>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));