import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import logo from './logo.svg';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() { //react componnent mount=we invoke the renderMap function
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
        client_id: "NYHKCEE05GRYYR3RCMJSCNBRUT5QOUSMPCFHYPPN2V00AYIM",
        client_secret: "WRMDYPZNCEXDVSGLUQIQQ2JJAVVETSBPECA2G1R4EMYWTOYR",
        query: "coffe",
        near: "Malmö",
        limit: 5,
        v: "20182507"
      }

    // axios
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState ({
        venues: response.data.response.groups[0].items
      }, this.renderMap())
    })
    .catch(error => {
      console.log("Ooops, Error details: " + error)
    })

  } //foursquare end-bracket



  initMap = () => {

         /* Map */
        var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 55.604981, lng: 13.003822},
			    zoom: 8
        })
         /* info window */
        var infowindow = new window.google.maps.InfoWindow()

         /* Loop */
        this.state.venues.map(firstvenue => {

          var contentString = `${firstvenue.venue.name}`

          /* Marker */
          var marker = new window.google.maps.Marker({
            position:
            {lat: firstvenue.venue.location.lat,
             lng: firstvenue.venue.location.lng},
            map: map,
            title: firstvenue.venue.name
        })

          /* When marker click'd = open infowindow */
          marker.addListener('click', function() {

            // Changes infowindow
            infowindow.setContent(contentString)

            // Opens infowindow
            infowindow.open(map, marker);
        });
      })

    } // initMap end-bracket

  render() {
    return (
      <main>
      <div id="map"></div>
      <div id="SearchBar">
<p>Search: <input data-bind="value: firstName" /></p>

      </div>
      <div className="search-books">
      <div className="search-books-bar">
        <nav className="close-search">
          Close
        </nav>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"

          />
        </div>
      </div>

      <div className="search-books-results">
        <ol className="books-grid">
            return (
              <li>

              </li>
            );

          })
        }
        </ol>
      </div>
    </div>


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
