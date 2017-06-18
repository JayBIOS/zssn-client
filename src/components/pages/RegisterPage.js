/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 5/23/17.
 */

import React from 'react';
import { Grid } from 'semantic-ui-react';

import Layout from './Layout';
import RegisterForm from '../register/RegisterForm';
import DoneModal from '../register/DoneModal';

class RegisterPage extends React.Component {
    handleGoBack() {
        this.props.history.push('/')
    }

    render() {
        return (
            <Layout>
                <Grid.Row centered>
                    <Grid.Column width={8}>
                        <RegisterForm/>
                    </Grid.Column>
                </Grid.Row>

                <DoneModal onGoBack={this.handleGoBack.bind(this)}/>
            </Layout>
        );
    }
}

export default RegisterPage;
