/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/15/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import {  } from 'react-router-dom';

import { registerFormDone } from '../../actions/registerForm';

const mapStateToProps = state => {
    return {
        open: state.registerFormReducer.done
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registerFormDone: bool => dispatch(registerFormDone(bool)),
    }
};

class DoneModal extends React.Component {
    handleClose() {
        this.props.registerFormDone(false)
    }

    goBack() {
        this.props.registerFormDone(false)
        this.props.onGoBack();
    }

    render() {
        return (
            <Modal dimmer="blurring"
                   open={this.props.open}
                   onClose={this.handleClose.bind(this)}>
                <Modal.Header>Registered with success</Modal.Header>
                <Modal.Content>
                    <p>A new survivor was added to our database.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button className="zssn-primary-button" onClick={this.goBack.bind(this)}>Go back</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoneModal);