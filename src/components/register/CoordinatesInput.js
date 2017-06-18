/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/13/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Dimmer, Divider, Form, Segment, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import Map from '../register/Map';
import { registerFormChange } from '../../actions/registerForm';

const mapStateToProps = state => {
    return {
        data: state.registerFormReducer.data,
        errors: state.registerFormReducer.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        formChange: (input) => dispatch(registerFormChange(input)),
    }
};

class CoordinatesInput extends React.Component {
    handleChange(e, { name, value }) {
        this.props.formChange({name: name, value: value});
    }

    handleCheckboxChange(e, { name, checked }) {
        this.props.formChange({name: name, value: checked });
    }

    render() {
        return (
            <div className="zssn-coordinates-input">
                <Checkbox name="hasCoordinates"
                          label="Do you know where you are?"
                          checked={this.props.data.hasCoordinates}
                          onChange={this.handleCheckboxChange.bind(this)}
                          toggle/>
                <Divider/>
                <Dimmer.Dimmable as={Segment} blurring dimmed={!this.props.data.hasCoordinates}>
                    <Map/>
                </Dimmer.Dimmable>
                <Form.Field>
                    <Input label={{ content: 'Latitude', color: this.props.errors.latitude ? 'red' : null }}
                           name="latitude"
                           placeholder="0.0"
                           disabled={!this.props.data.hasCoordinates}
                           value={this.props.data.latitude}
                           onChange={this.handleChange.bind(this)}
                           error={this.props.errors.latitude !== null}
                           fluid/>
                </Form.Field>
                <Form.Field>
                    <Input label={{ content: 'Longitude', color: this.props.errors.longitude ? 'red' : null }}
                           name="longitude"
                           placeholder="0.0"
                           disabled={!this.props.data.hasCoordinates}
                           value={this.props.data.longitude}
                           onChange={this.handleChange.bind(this)}
                           error={this.props.errors.longitude !== null}
                           fluid/>
                </Form.Field>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoordinatesInput));