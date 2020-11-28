import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./App.css";
import * as parkingdata from "./parking.geojson";
import getResults from './MapboxAJAX';
import UserInput from "./UserInput";
//import {querydata} from './MapboxAJAX';

var geocoderGlobal = "";
var mapGlobal = "";
var coordinates;
var querydata;

class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -84.387,
      lat: 33.749,
      zoom: 13,
      input: "",
      geolat: null,
      geolong: null,
      currPage: "Search",
      curLat: 0.0,
      curLng: 0.0,
    };
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
      bbox: [-84.401037, 33.745468, -84.370436, 33.768017], //min long, min lag, max long, max lat
    });

    //Geocoder
    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      placeholder: "Address, Place, City or Venue",
      marker: false, // Do not use the default marker style
      limit: 10, //limits the search suggestion results
      types: "poi",
      //render geocoder for suggested list of items with logo,text and address
      render: function (item) {
        var maki = item.properties.maki || "marker";
        {
          return (
            "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" +
            maki +
            "-15.svg'><span class='geocoder-dropdown-text'> " +
            item.text +
            "</span><span class='geocoder-dropdown-text'> <br>" +
            item.properties.address +
            "</span></div>"
          );
        }
      },
    });

    // Add the geocoder to the map
    //map.addControl(geocoder);

    const SearchBox = document.getElementById("geocoder");
    if (SearchBox != null) {
      SearchBox.appendChild(geocoder.onAdd(map));
    }
    // document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

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
    map.on("load", function () {
      
/*       map.addSource("locations", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      }); */
      //add single point mark for geocoder result
     /*  map.addLayer({
        id: "point",
        source: "single-point",
        type: "symbol",
        layout: {
          "icon-image": "parking-15",
          "icon-allow-overlap": true,
        },
      }); */

 //     add parking spots from json file
 
    //   map.addLayer({
    //   id: "parkingpoints",
    //   type: "symbol",
    //    /* Add a GeoJSON source containing place coordinates and information. */
    //    source: "locations",
    //    layout: {
    //      "icon-image": "parking-15",
    //      "icon-allow-overlap": true,
    //    },
    //  });
     map.on("click", "locations", function (e) {
       var coordinates = e.features[0].geometry.coordinates.slice();
       var address = e.features[0].properties.address;
       var place_name = e.features[0].place_name;
       // Ensure that if the map is zoomed out such that multiple
        //copies of the feature are visible, the popup appears
        //over the copy being pointed to.
       while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
       }

       new mapboxgl.Popup()
         .setLngLat(coordinates)
         .setHTML("<h3>" + place_name + "</h3>" + "<p>" + address + "</p>")
         .addTo(map);
     });
     // Change the cursor to a pointer when the mouse is over the places layer.
     map.on("mouseenter", "locations", function () {
       map.getCanvas().style.cursor = "pointer";
     });

//        Change it back to a pointer when it leaves.
     map.on("mouseleave", "locations", function () {
       map.getCanvas().style.cursor = "";
     });
//      Listen for the `result` event from the Geocoder
    //  `result` event is triggered when a user makes a selection
      // Add a marker at the result's coordinates

/*       geocoder.on('result', function(e) {
        map.getSource('single-point').setData(e.result.geometry);

      }); */
      //Geocoder results after user submit search term

      geocoder.on("result", function (result) {
      
        var lat = result.result.center[1];
        var long = result.result.center[0];

        //getResults(long, lat);
        // Create the query
          var query =
          "https://api.mapbox.com/geocoding/v5/mapbox.places/parking.json?limit=10&proximity=" +
          long +
          "," +
          lat +
          "&types=poi&&access_token=pk.eyJ1IjoicmFmYWVsaGR6YSIsImEiOiJja2dzeHJjbnMwZzE3MnJtNWV6cHVsam9sIn0.7oigwdpk6AYK5VqUZq3phg";
        var $ = require("jquery");
        $.ajax({
          method: "GET",
          url: query,
        }).done(function (data) {
          // Get the data from the response
          querydata = (JSON.stringify(data));
          coordinates = data.features[0].geometry.coordinates;    
          // Set  markers of locations on the map
          console.log("The coordinates: " + coordinates)
          console.log("The data "+ querydata);
          console.log("QUERY DATA IN MAPBOX:"+querydata);

          //addQuery(coordinates)
          map.addSource("single-point", {
            type: "geojson",
            data: querydata,
          });
          map.getSource("single-point").setData(result.result.geometry);
            // If a route is already loaded, remove it
          if (map.getSource('single-point')) {
            //map.removeLayer('single-point')
            map.removeSource('single-point')
          } else { // Add a new layer to the map
           map.addLayer({
            "id": "locations",
            "type": "symbol",
            
            "source": {
              "type": "geojson",
              "data": querydata /* {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [coordinates]
                }
              } */
            },
            "layout": {
              "icon-image": "parking-15",
                "icon-allow-overlap": true,
            },
          });
        } 
        });
        
        

        console.log("_____\nName\n", result.result.place_name);
        console.log("Lat/Long", lat, ",", long, "\n_____");
      });
    });
  }
  //add markers from JSON file with some parking lot examples
  addMarkers() {
    querydata.features.forEach(function (parking, i) {
      parking.properties.id = i;
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
          <div className="col-lg-4" id="input-side">
            {/*Sidebar*/}
            <UserInput
              didMount={this.componentDidMount}
              geocoder={geocoderGlobal}
              map={mapGlobal}
            />
            {/* <div id='listings' className='listings'></div> */}
          </div>

          <div ref={(el) => (this.mapContainer = el)} className="col-lg-8" />
        </div>
      </div>
    );
  }
}

export default Mapbox;

