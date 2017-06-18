/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/15/17.
 */
import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Layout from './Layout';

class NotFoundPage extends React.Component {
    render() {
        return (
            <Layout>
                <Grid.Row centered>
                    <Grid.Column width={8}>
                        <Segment>
                            <Header>Are you lost?</Header>
                            <p>
                                Don't worry we'll guide you to our
                                <Link to="/"> home page</Link> where you can feel safe.
                            </p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Layout>
        );
    }
}

export default NotFoundPage;
