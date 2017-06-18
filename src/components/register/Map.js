/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 6/13/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import Leaflet from 'leaflet';
import { withRouter } from 'react-router-dom';

import { survivorLocationFound } from '../../actions/map';

const mapStateToProps = state => {
    return {
        hasCoordinates: state.registerFormReducer.data.hasCoordinates,
        latitude: state.registerFormReducer.data.latitude,
        longitude: state.registerFormReducer.data.longitude
    }
};

const mapDispatchToProps = dispatch => {
    return {
        locationFound: coordinates => { dispatch(survivorLocationFound(coordinates)) }
    }
};

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = { map: null, currentLocation: null }
    }

    componentDidMount() {
        delete Leaflet.Icon.Default.prototype._getIconUrl;

        Leaflet.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        });

        const accessToken = 'pk.eyJ1IjoiamF5YmlvcyIsImEiOiJjajN3NzBmdGEwMDB5MzJvMXZhNjZmamV5In0.gmCnehLNTOc9EGi3l3uxag';

        // Initialize map
        this.state.map = Leaflet.map('zssn-map', {
            zoomControl: false
        }).setView([this.props.latitude, this.props.longitude], 17);

        // Change tiles
        Leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}' +
            '?access_token=' + accessToken, {
            attributionControl: false,
            maxZoom: 18
        }).addTo(this.state.map);

        this.state.map.locate({
            setView: true,
            enableHighAccuracy: true,
            maxZoom: 18
        });

        this.state.map.on('locationerror', this.handleLocationError.bind(this));

        this.state.map.on('locationfound', this.handleLocationFound.bind(this));

        this.state.map.on('click', this.handleClick.bind(this));

        this.toggleMap();
    }

    changeCurrentLocation(latitude, longitude) {
        if (!this.state.currentLocation) {
            this.state.currentLocation = Leaflet.marker([
                latitude,
                longitude
            ]).addTo(this.state.map);
        } else {
            this.state.currentLocation.setLatLng([latitude, longitude]);
        }
    }

    handleLocationFound(e) {
        this.changeCurrentLocation(e.latlng.lat, e.latlng.lng);
        this.props.locationFound({ latitude: e.latlng.lat.toString(), longitude: e.latlng.lng.toString() });
    }

    handleLocationError(e) {
        this.changeCurrentLocation(this.props.latitude,
                                   this.props.longitude);
    }

    handleClick(e) {
        this.changeCurrentLocation(e.latlng.lat, e.latlng.lng);
        this.props.locationFound({ latitude: e.latlng.lat.toString(), longitude: e.latlng.lng.toString() });
    }

    disableMap() {
        if (!this.state.map)
            return;

        this.state.map._handlers.forEach(handler => {
            handler.disable();
        });
    }

    enableMap() {
         if (!this.state.map)
            return;

         this.state.map._handlers.forEach(handler => {
            handler.enable();
        });
    }

    toggleMap() {
        if (!this.props.hasCoordinates)
            this.disableMap();
        else
            this.enableMap();
    }

    updateMap() {
        const latitude = parseFloat(this.props.latitude);
        const longitude = parseFloat(this.props.longitude);

        if (!latitude || !longitude) {
           return;
        }

        this.state.map.setView([latitude, longitude]);
        this.changeCurrentLocation(latitude, longitude);
    }

    componentDidUpdate() {
        this.toggleMap();
        this.updateMap();
    }

    render() {
        return (
            <div id="zssn-map"/>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));