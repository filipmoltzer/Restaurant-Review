import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import escapeRegExp from 'escape-string-regexp'
import MapContainer from './maps.js'
import Nav from './navbar.js';

class App extends Component {
  state = {
    locations: [],
    query: '',
    filteredlocs: [],
    currentLocation: '',
    position: { lat: 55.6, lng: 13.00 },
    zoom: 10,
    showInfoW: false,
    activeMarker: {},
    selectedPlace: {},
    photos: [],
    markericon: null
  }
  componentDidMount() {
    fetch('loc.json')
      .then(response => response.json()).then(locations => this.setState({
        locations: [...locations],
        filteredlocs: [...locations]
      }))
  }

  filter = (query) => {
    const match = new RegExp(escapeRegExp(query), 'i')
    this.setState({
      query,
      filteredlocs: this.state.locations.filter((location) => match.test(location.name)) || this.state.locations
    })
  }
  addImage = (query) => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&
    api_key=88925b9701cd7b7cdf37198cb58b300d&
    text=${query}&is_getty=1&sort=interestingness-desc&
    per_page=2&format=json&nojsoncallback=1`, {
      }).then(response => response.json()
      .then(data => {
        this.setState({ photos: data.photos.photo })
      }))
      .catch(err => {
        this.setState({ photos: [{
            id:404,
            title:'Image not found'
          }]
        })

      })
  }
  onLocClicked = (loc) => {
    this.filter(loc.textContent)
    this.setState({
      currentLocation: loc.textContent
    })
  }
  onMarkerClick = (props, marker, e) => {
    this.filter(props.name)
    this.addImage(props.name)
    this.setState({
      position: props.position,
      zoom: 12,
      selectedPlace: props,
      activeMarker: marker,
      showInfoW: true,
      markericon: {
        url: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Simpleicons_Places_map-marker-variant-tool.svg",
        scaledSize: new window.google.maps.Size(48, 48)
      }
    })
  }
  onMapClicked = (props) => {
    if (this.state.showInfoW) {
      this.setState({
        position: { lat: 55.6, lng: 13.00 },
        zoom: 8,
        showInfoW: false,
        activeMarker: null,
        currentLocation: null,
        query: '',
        filteredlocs: this.state.locations,
        photos: [],
        markericon: null
      })
    }
  };
  clear = () => {
    this.setState({
      query: '',
      filteredlocs: this.state.locations,
    })
    this.onMapClicked()
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row flex-column flex-lg-row">
          <Nav locations={this.state.filteredlocs} query={this.state.query} filter={this.filter} onLocClicked={this.onLocClicked}
            clear={this.clear} />
          <MapContainer google={this.props.google} locations={this.state.filteredlocs} currentLocation={this.state.currentLocation}
            onMapClicked={this.onMapClicked} onMarkerClick={this.onMarkerClick} showInfoW={this.state.showInfoW}
            activeMarker={this.state.activeMarker} selectedPlace={this.state.selectedPlace} position={this.state.position}
            zoom={this.state.zoom} markericon={this.state.markericon} photos={this.state.photos} />
        </div>
      </div>
    )
  }
}

export default App;
