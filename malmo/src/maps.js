import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


class LoadingContainer extends Component {
    state = {
        loaded: true
    }

    render() {

        document.onreadystatechange = () => {
            if (document.readyState === 'complete') {
                if (!window.google) this.setState({ loaded: false })
            }
        }

        if (this.state.loaded) {
            return (
                <div className='h3 mx-auto mt-5'>Loading Google Maps</div>
            )
        }
        return (
            <div className='h3 mx-auto mt-5'>Google Maps couldnt load</div>
        )
    }
}

export class MapContainer extends Component {
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.currentLocation) {
            if (nextProps.currentLocation !== this.props.currentLocation) {
                this.props.onMarkerClick({ ...this.refs }[nextProps.currentLocation].props, { ...this.refs }[nextProps.currentLocation].marker)
            }
        }
        if (nextProps.locations.length !== this.props.locations.length) {
            this.props.onMapClicked(nextProps)
        }
    }

    render() {
        const locations = this.props.locations
        return (
            <Map className="mapContainer col-lg-9"
                google={this.props.google}
                initialCenter={this.props.position}
                center={this.props.position}
                zoom={this.props.zoom}
                onClick={this.props.onMapClicked}>
                {locations.map(location =>
                    <Marker ref={location.name}
                        key={location.id}
                        onClick={this.props.onMarkerClick}
                        name={location.name}
                        title={location.name}
                        position={location.position}
                        icon={this.props.markericon} />
                )}
                <InfoWindow
                    marker={this.props.activeMarker}
                    visible={this.props.showInfoW}>
                    <div>
                        <h2 className='h5 text-center p-1'>{this.props.selectedPlace.name}</h2>
                        {this.props.photos.map(photo =>
                            <img key={photo.id} className="img-thumbnail mx-1" src={photo.farm ? `https://farm${photo.farm}.static.flickr.com/${
                                photo.server}/${photo.id}_${photo.secret}_t.jpg` : "https://dribbble.com//shots/2309412-Daily-UI-404-Error?utm_source=Clipboard_Shot&utm_campaign=sugonzalez&utm_content=Daily%20UI%20404%20Error%20&utm_medium=Social_Share"}
                                alt={photo.title} />)}
                        <p className='text-center pt-0 m-2'>Images from Flicker API</p>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}
export default GoogleApiWrapper((props) => {
    return {
        apiKey: ('AIzaSyDkr51-HI0Ko88nYe0xka9-243WPgZqBGk'),
        LoadingContainer: LoadingContainer
    }
}
)(MapContainer)
