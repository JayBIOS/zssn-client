/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Header, Grid, List, Segment } from 'semantic-ui-react';

import Layout from './Layout';
import BigMap from '../overview/BigMap';
import StatisticsWall from '../overview/StatisticsWall';

const HomePage = () => (
    <Layout>
        <Grid.Row centered>
            <BigMap/>
        </Grid.Row>
        <Grid.Row centered>
            <Segment textAlign="left">
                <Header as="h3" dividing>
                    Statistics
                </Header>
                <StatisticsWall/>
                <Divider section={true}/>
                <List horizontal>
                    <List.Item>
                        <List.Content>
                            <Button disabled basic content="Identify yourself" icon="user"/>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <Link to="/register">
                                <Button basic content="Register a survivor" icon="add user"/>
                            </Link>
                        </List.Content>
                    </List.Item>
                </List>
            </Segment>
        </Grid.Row>
    </Layout>
);

export default HomePage;
