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
      "pk.eyJ1IjoibmFkaW1rMSIsImEiOiJja2doaGh5dWowM292MnpudW03MHc2MzdwIn0.TU9JkM8-F3FZ5RKTTO3n9A";
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/nadimk1/ckghhntfd19g51ao0zjbqcu65",
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
      <div className="container-fluid">
        <div className="row">
          <style>
            {
              "\
        #input-side{\
          height: 92vh;\
          padding-top: 15%;\
          padding-bottom: 25%;\
          justify-content: center;\
          align-items: center;\
          text-align: center;\
        }\
      "
            }
          </style>
          <div className="col-lg-4" id="input-side">
            <div id="Text">
              <h1>Where Do You Want To Go?</h1>
            </div>
            <div id="Usr-Input">
              <input
                type="text"
                value={this.state.input}
                onChange={this.newInput.bind(this)}
              />
            </div>
          </div>
          <div ref={(el) => (this.mapContainer = el)} className="col-lg-8" />
          <div className="">
           
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Mapbox />, document.getElementById("root"));
export default Mapbox;
