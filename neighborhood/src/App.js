import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() { //react componnent mount=we invoke the renderMap function
    this.renderMap()
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBKJrBNfl9WsPwuk0cattZ-lM8VgrddHCo&callback=initMap")
    window.initMap = this.initMap
  }

    // foursquare
    getVenues = () => {
      const endPoint = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        client_id: "5FYYDPU5J1B2T45JT4B1P5OFEGA4ZSPWARV5ZIZJKJUJLFGM",
        client_secret: "R1KLNCE1UOR5Z5GA43Y2CGAKCS0WMZDBRJEOP0DOCTM3HK4W",
        query: "food",
        near: "Sydney",
        v: "20182507"
      }

    // axios
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState ({
        venues: response.data.response.groups[0].items
      })
    })
    .catch(error => {
      console.log("Ooops, Error details: " + error)
    })

  } //foursquare end-bracket



  initMap = () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        })
        var marker = new window.google.maps.Marker({
          position: {lat: -34.397, lng: 150.644},
          map: map,
          title: 'Hello World!'
      });
      }

  render() {
    return (
      <main>
      <div id="map"></div>
      </main>

    )
  }
}

function loadScript (url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)

}
export default App;
