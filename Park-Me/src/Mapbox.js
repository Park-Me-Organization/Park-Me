import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./App.css";
import * as parkingdata from "./parking.geojson";
import getResults from "./MapboxAJAX";
import UserInput from "./UserInput";
import { Link, Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";

//import {querydata} from './MapboxAJAX';

var coordinates;
var $ = require("jquery");

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
      toReservationDetails: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.buttonRef = React.createRef();
  }

  handleClick() {
    this.setState({ toReservationDetails: true });
  }
  componentDidMount(props) {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibmFkaW1rMSIsImEiOiJja2doaGh5dWowM292MnpudW03MHc2MzdwIn0.TU9JkM8-F3FZ5RKTTO3n9A";

    //Mapbox Map View
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/nadimk1/ckghhntfd19g51ao0zjbqcu65",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      limit: 10,
      parkingdata: {},
      bbox: [-84.401037, 33.745468, -84.370436, 33.768017] //min long, min lag, max long, max lat
    });

    const self = this;
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
      render: function(item) {
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
      }
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
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true,
        showAccuracyCircle: true
      })
    );

    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    map.on("load", function() {
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
      map.on("click", "locations", function(e) {
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
          .setHTML("<h3>" + place_name + "</h3>" + "<p>" + address + "</p><br><p>Price: $" + this.state.pData.price + "/hr</p>")
          .addTo(map);
      });
      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "locations", function() {
        map.getCanvas().style.cursor = "pointer";
      });

      //        Change it back to a pointer when it leaves.
      map.on("mouseleave", "locations", function() {
        map.getCanvas().style.cursor = "";
      });

      //take location input from geocoder and place markers at the 10 closest
      // parking lots from entered location
      geocoder.on("result", function(result) {
        $(".marker").remove();
        $(".Main-Marker").remove();
        // create div for the marker
        var mainMarker = document.createElement("div");
        mainMarker.className = "Main-Marker";

        // add marker to map
        new mapboxgl.Marker(mainMarker)
          .setLngLat(result.result.geometry.coordinates)
          .addTo(map);

        // create the query
        var query =
          "https://api.mapbox.com/geocoding/v5/mapbox.places/parking.json?limit=10&proximity=" +
          result.result.geometry.coordinates[0] +
          "," +
          result.result.geometry.coordinates[1] +
          "&types=poi&&access_token=pk.eyJ1IjoicmFmYWVsaGR6YSIsImEiOiJja2dzeHJjbnMwZzE3MnJtNWV6cHVsam9sIn0.7oigwdpk6AYK5VqUZq3phg";

        $.ajax({
          method: "GET",
          url: query
        }).done(function(data) {
          console.log("data: ", data);
          // Get the data from the response
          coordinates = data.features[0].geometry.coordinates;
          // Set  markers of locations on the map
          console.log("The coordinates: " + coordinates);

          data.features.forEach(function(marker, props) {
            // create a DOM element for the marker
            var el = document.createElement("div");
            el.className = "marker";

            var address =
              marker.properties.address == undefined
                ? marker.place_name.substring(
                    marker.place_name.indexOf(",") + 1
                  )
                : marker.properties.address;

            var directBtn = document.createElement("div");

            // reactDom.render(<Redirect to={{
            //   pathname: "/reserve",
            //   state: {name: marker.text.toUpperCase(), parkingAddress: address, spots: "5" }
            // }},directBtn );

            var pData = {
              name: marker.text.toUpperCase(),
              hours: {
                opening: Math.floor((Math.random() * 3)+7),
                closing: Math.floor((Math.random() * 5)+5)
              },
              price: Math.floor((Math.random() * 11)+3),
              address: address,
              availablespots:  Math.floor((Math.random() * 16)),
    
            };

            var description = `<h1>Hello World!</h1> 
            <button className="btn" ref=${self.buttonRef.current}>todo</button>`;
            var popupInfo =
              '<h1 id="popupTitle">' +
              marker.text.toUpperCase() +
              "</h1>" +
              '<p id="popupDetails" >' +
              address +
              "</p>" +
              '<p id="popupDetails">Price: $' + pData.price + '</p>' +
              '<div id="aContainer"><a style="background-color: #1A2637;border-color: white;font-family:"Roboto Slab";" class="btn btn-primary" href="/reserve"> RESERVE </a></div>';
            // var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(description);
            var popup = new mapboxgl.Popup()
              .setLngLat([-96, 37.8])
              .setHTML(
                `<h1 id="popupTitle"> ${marker.text.toUpperCase()} </h1><p id="popupDetails" >${address}</p><p id="popupDetails">Available Spots: ${pData.availablespots}</p>
                <p id="popupDetails">Price: $${pData.price}/hr </p>
                <p id="popupDetails">Hours: ${pData.hours.opening}AM-${pData.hours.closing}PM</p><div id="aContainer">
                

                <button style="background-color: #1A2637;font-family:"Roboto Slab";border-color: white;" Name="btn" class="btn btn-primary" ref=${
      self.buttonRef.current
    }>RESERVE</button></div>`
              )
              .addTo(map);
            const btn = document.getElementsByName("btn")[0];
            btn.addEventListener("click", self.handleClick);

            // add marker to map
            new mapboxgl.Marker(el)
              .setLngLat(marker.geometry.coordinates)
              .setPopup(popup)
              .addTo(map)
              .getElement()
              .addEventListener("click", () => {
                self.setState({
                  pData: {name: pData.name,
                    hours: {
                      opening: pData.hours.opening,
                      closing: pData.hours.closing +12,
                    },
                    price: pData.price,
                    address: pData.address,
                    availablespots:  pData.availablespots,
                }});
              });
          });
        });
      });
    });
  }

  render() {
    if (this.state.toReservationDetails === true) {
      return (
        <div>{console.log("pData: ", this.state.pData)}
        <Redirect
        to={{
          pathname: "/reservationdetails",
          state: { parkingData: this.state.pData }
        }}
      /></div>
        
      );
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4" id="input-side">
            <UserInput />
          </div>
          <div ref={el => (this.mapContainer = el)} className="col-lg-8" />
        </div>
      </div>
    );
  }
}

export default Mapbox;
