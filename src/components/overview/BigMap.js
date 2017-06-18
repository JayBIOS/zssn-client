/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/17/17.
 */
import _ from 'lodash';
import React from 'react';
import { Dimmer, List, Loader, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Leaflet from 'leaflet';
import { withRouter } from 'react-router-dom';
import tinyColor from 'tinycolor2';

import { survivorsFetch } from '../../actions/survivors';
import SurvivorLabel from './SurvivorLabel';

const mapStateToProps = state => {
    return {
        survivors: state.survivorsReducer.survivors,
        fetching: state.survivorsReducer.fetching
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSurvivors: () => dispatch(survivorsFetch())
    }
};

class BigMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { map: null, markers: null, colors: {} }
    }

    componentDidMount() {
        const accessToken = 'pk.eyJ1IjoiamF5YmlvcyIsImEiOiJjajN3NzBmdGEwMDB5MzJvMXZhNjZmamV5In0.gmCnehLNTOc9EGi3l3uxag';

        // Initialize map
        this.state.map = Leaflet.map('zssn-big-map', {
            zoomControl: false
        });

        this.state.map.fitWorld();

        // Change tiles
        Leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}' +
            '?access_token=' + accessToken, {
            attributionControl: false,
            maxZoom: 18
        }).addTo(this.state.map);

        this.state.markers = Leaflet.layerGroup();
        this.state.markers.addTo(this.state.map);

        this.props.fetchSurvivors();
    }

    componentDidUpdate() {
        this.state.markers.clearLayers();
        _.each(this.props.survivors, survivor => {
            if (survivor.latitude && survivor.longitude) {
                if (!this.state.colors[survivor.id])
                    this.state.colors[survivor.id] = survivor['infected?'] ? tinyColor('#D8DADD') : tinyColor.random();

                const colorHex = this.state.colors[survivor.id].toHexString();

                const div = `<div class="zssn-marker" style="background: ${colorHex};"></div>` +
                            '<div class="zssn-marker-shadow"></div>';
                const icon = Leaflet.divIcon({html: div});

                Leaflet.marker([survivor.latitude, survivor.longitude], {icon: icon})
                    .bindTooltip(survivor.name)
                    .addTo(this.state.markers);
            } else {
                // TODO: Show survivors with unknown location.
            }
        });
    }

    handleClick(e, target) {
        this.state.map.setView([target['data-latitude'], target['data-longitude']], 18);
    }

    render() {
        const sortedSurvivors = _.sortBy(this.props.survivors, survivor => {
            return survivor.name;
        });

        const names = {};

        const isAPreposition = word => {
            const PREPOSITIONS = ['de', 'da', 'do'];
            return _.includes(PREPOSITIONS, word);
        };

        let data = {};

        _.each(sortedSurvivors, survivor => {
            const words = _.words(survivor.name);

            let currentKey = names;

            data[survivor.id] = { name: [] };

            _.each(words, word => {
                if(currentKey[word]) {
                    currentKey = currentKey[word];
                    data[survivor.id].name.push(word);
                    if (!currentKey[currentKey.rest[0]]) {
                        data[currentKey.id].name.push(currentKey.rest[0]);
                        currentKey[currentKey.rest[0]] = { id: currentKey.id, rest: _.filter(currentKey.rest, w => {
                            return w !== currentKey.rest[0];
                        }) };

                        if (isAPreposition(currentKey.rest[0])) {
                            data[currentKey.id].name.push(currentKey.rest[1]);
                            currentKey[currentKey.rest[0]][currentKey.rest[1]] = {
                                id: currentKey.id,
                                rest: _.filter(currentKey[currentKey.rest[0]].rest, w => {
                                    return w !== currentKey.rest[1];
                                })
                            };
                        }
                    }
                }
                else {
                    const rest = _.filter(words, w => {
                        return w !== word;
                    });
                    currentKey[word] = { id: survivor.id, rest: rest };
                    data[survivor.id].name.push(word);
                    if (!isAPreposition(word))
                        return false;
                }
            });
        });

        const labels = _.map(sortedSurvivors, survivor => {
            const color = this.state.colors[survivor.id];

            if (!color) return;

            return (
                <List.Item key={survivor.id} className="zssn-align-label">
                    <List.Content>
                        <SurvivorLabel name={data[survivor.id].name.join(' ')}
                                       survivor={survivor}
                                       color={color}
                                       onClick={this.handleClick.bind(this)}/>
                    </List.Content>
                </List.Item>
            );
        });

        return (
            <div className="zssn-big-map-segment">
                <Segment.Group>
                    <Dimmer.Dimmable as={Segment} blurring dimmed={this.props.fetching}>
                        <Dimmer active={this.props.fetching} inverted>
                            <Loader active={this.props.fetching} disabled={!this.props.fetching}/>
                        </Dimmer>
                        <div id="zssn-big-map"/>
                    </Dimmer.Dimmable>
                    <Segment textAlign="left">
                        <List horizontal>
                            {labels}
                        </List>
                    </Segment>
                </Segment.Group>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BigMap));