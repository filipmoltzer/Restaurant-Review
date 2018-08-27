import './App.css';
import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {

  componentDidMount() { //react componnent mount=we invoke the renderMap function
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBKJrBNfl9WsPwuk0cattZ-lM8VgrddHCo&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        })
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
