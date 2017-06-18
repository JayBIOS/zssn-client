/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/17/17.
 */
import React from 'react';
import { Label, Icon } from 'semantic-ui-react';
import tinyColor from 'tinycolor2';

class SurvivorLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovering: false
        };
    }

    onMouseEnter() {
        this.setState({hovering: true});
    }

    onMouseLeave() {
        this.setState({hovering: false});
    }

    render() {
        const c = tinyColor(this.props.color.toHexString());
        const color = this.state.hovering ? c.darken() : c;

        const style = {
            backgroundColor: color.toHexString(),
            color: color.isLight() ? 'black' : 'white'
        };

        return (
            <Label as="a"
                   data-latitude={this.props.survivor.latitude}
                   data-longitude={this.props.survivor.longitude}
                   style={style}
                   onMouseEnter={this.onMouseEnter.bind(this)}
                   onMouseLeave={this.onMouseLeave.bind(this)}
                   image
                   onClick={this.props.onClick}>
                <Icon name={this.props.survivor['infected?'] ? 'warning' : this.props.survivor.gender}/>
                {this.props.name}
                <Label.Detail>{this.props.survivor.age}</Label.Detail>
            </Label>
        );
    }
}

export default SurvivorLabel;