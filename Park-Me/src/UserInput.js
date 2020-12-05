import React, { Component, useState } from "react";

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };
  }

  render() {
    return (
      <div>
        <h1 id="Title">Where Do You Want To Go?</h1>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "55%",
            textAlign: "center"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div id="geocoder"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInput;
