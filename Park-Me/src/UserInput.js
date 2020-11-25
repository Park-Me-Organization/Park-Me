import React, { Component } from "react";
// import Slider from "@material-ui/core/Slider";
import Slider from "./Slider.js";
import Button from "react-bootstrap/Button";
import ReactDOM from "react-dom";

function showRadius() {
  const selectRadius = (
    <div>
      <p
        style={{
          marginTop: "10px",
          fontFamily: "Roboto",
          fontSize: "1.5rem",
        }}
      >
        What is your radius?
      </p>
      <Slider
        style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}
      />
    </div>
  );
  ReactDOM.render(selectRadius, document.getElementById("root"));
}

class UserInput extends Component {
  constructor() {
    super();
    this.state = {
      lat: "",
      Long: "",
      radius: "",
    };
  }

  render() {
    return (
      <div>
        <h1 id="Title">Where Do You Want To Go?{this.props.lat_lng}</h1>
        <div id="geocoder"></div>
        <Button
          variant="secondary"
          style={{
            marginTop: "20px",
            backgroundColor: "#1A2637",
            width: "100px",
            padding: "8px",
          }}
        >
          go
        </Button>
        {/* <p
          style={{
            marginTop: "10px",
            fontFamily: "Roboto",
            fontSize: "1.5rem",
          }}
        >
          What is your radius?
        </p>
        <Slider
          style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}
        /> */}
      </div>
    );
  }
}

export default UserInput;
