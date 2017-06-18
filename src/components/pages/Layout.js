/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/15/17.
 */
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

import TitleHeader from '../base/TitleHeader';

class Layout extends React.Component {
   render() {
      return (
        <Container>
            <Grid>
                <Grid.Row centered>
                    <TitleHeader/>
                </Grid.Row>

                {this.props.children}
            </Grid>
        </Container>
      );
   }
}

export default Layout;