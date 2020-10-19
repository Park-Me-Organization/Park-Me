import React, { Component } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

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

  componentDidMount() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmFmYWVsaGR6YSIsImEiOiJjazhtNDN3bjQwanM3M2ZxeHBwMzQwb2N4In0.RWPT0miQILyaM0B5aYTnjg";
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

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
  }

  newInput(event) {
    this.setState({
      input: event.target.value,
    });
  }
  render() {
    return (
      <div className="listmap">
          <style>
            {
              "\
        .input-side{\
          height: 92vh;\
          padding: 20px;\
        }\
      "
  
            }
          </style>
        <div className="input-side">
          <h1>This is an input: {this.state.input}</h1>
          <input
            type="text"
            value={this.state.input}
            onChange={this.newInput.bind(this)}
          />
          
        </div>
        <div ref={(el) => (this.mapContainer = el)} className="map pad2" />
      </div>
    );
  }
}
ReactDOM.render(<Mapbox />, document.getElementById("root"));
export default Mapbox;
