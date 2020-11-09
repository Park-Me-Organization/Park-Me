import React, { Component } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './App.css';
import * as parkingdata from "./parking.geojson";

class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -84.387,
      lat: 33.749,
      zoom: 13,
      input: "",
    };
  }
  addMarkers(){
    parkingdata.features.forEach(function(parking, i){
      parking.properties.id = i;
    });
  }
    
  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmFkaW1rMSIsImEiOiJja2doaGh5dWowM292MnpudW03MHc2MzdwIn0.TU9JkM8-F3FZ5RKTTO3n9A";
      //Mapbox Map View
      const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/nadimk1/ckghhntfd19g51ao0zjbqcu65",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      limit: 10,
      bbox: [-84.401037,33.745468,-84.370436,33.768017]  //min long, min lag, max long, max lat
    });

      //Geocoder 
    const geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      placeholder: 'Address, Place, City or Venue',
      marker: false, // Do not use the default marker style
      limit: 5  //limits the search suggestion results
      
    });
    
    // Add the geocoder to the map
    //map.addControl(geocoder);
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    //Locate button
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
        showAccuracyCircle: true,
      })
    );

    
    // After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', function() {
  
  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  }
  );
  
  map.addLayer({
    "id": "locations",
    "type": "symbol",
    /* Add a GeoJSON source containing place coordinates and information. */
    "source": {
      "type": "geojson",
      "data": parkingdata
    },
    "layout": {
      "icon-image": "parking-15",
      "icon-allow-overlap": true,
    }
  });

 


  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  //  Add a marker at the result's coordinates
  
  // geocoder.on('result', function(e) {
  //   map.getSource('single-point').setData(e.result.geometry);
    
  // });

  geocoder.on('result', function(result) {
    console.log("_____\nName\n", result.result.place_name);
    console.log("Lat/Long", result.result.center[1], ",", result.result.center[0], "\n_____");
 });
  
});
  }

  newInput(event) {
    this.setState({
      input: event.target.value,
    });
  }

  
  render() {

    return (
      
      <div className="container-fluid">
        <div className="row">

           <div className="col-lg-4" id="input-side"> {/*Sidebar*/}
            <div>
              <h1 id="Title">Where Do You Want To Go?</h1>
            </div>
            <div id="geocoder" className="geocoder"></div>
            {/* <div id='listings' className='listings'></div> */}

          </div>
        
          <div ref={(el) => (this.mapContainer = el)} className="col-lg-8" />

        </div>
      </div>
    );

    
  }
}
ReactDOM.render(<Mapbox />, document.getElementById("root"));
export default Mapbox;
