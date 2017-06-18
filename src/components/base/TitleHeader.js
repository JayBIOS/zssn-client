/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/11/17.
 */
import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TitleHeader extends React.Component {
    render() {
        return (
            <Link to="/"><Header icon textAlign="center" className="zssn-header">
                <Icon name="protect"/>
                <Header.Content>Zombie Survival Social Network</Header.Content>
            </Header></Link>
        );
    }
}

export default TitleHeader;