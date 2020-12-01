import React, { Component } from "react";
import FormError from "./FormError";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import QRious from 'qrious';

class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      lname: "",
      email: "",
      phonenumber: "",
      license: "",
      state: "",
      finalRegistrationInfo: {},
      toReceipt: false,
      errorMessage: null,
      qrcode: 'default'
    };

    this.handleChange = this.handleChange.bind(this); //constructor <-handle change
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    //Collects the value for each item name

    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    var registrationInfo = {
      user: this.state.user,
      lname: this.state.lname,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      passOne: this.state.passOne,
      license: this.state.license,
      state: this.state.state,
      
    };
    this.setState({
      toVehicleDetails: true,
      finalRegistrationInfo: registrationInfo,
    });
    console.log(registrationInfo);
    e.preventDefault();
  }
  
  render(qrcode) {
    if (this.state.toReceipt === true) {
      return (
        <Redirect
          to={{
            pathname: "/receipt",
            state: this.state,
          }}
        />
      );
    }
    function generateQRCode(qrcode) {
      var qrtext = qrcode;
      console.log("qrcode:"+qrtext);
      var qr = new QRious({
        element: document.getElementById('qr-code'),
        size: 200,
        value: 'https://studytonight.com'
    });
  
      qr.set({
          foreground: 'black',
          size: 200,
          value: qrtext
      });
  }
    generateQRCode(qrcode);
    return (
      <div>
        
    
    <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A2637",
          maxWidth: "fit-content",
          margin: "10px auto",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        <div
          style={{
            fontFamily: "Roboto Slab",
            color: "white",
            fontSize: "1.2rem",
            margin: "20px 0",
            textAlign: "center"
          }}
        >
          <h1 style={{ fontFamily: "Roboto Slab" }}>
            Please Confirm Your Information
          </h1>
          <canvas id="qr-code"></canvas>

          <hr style={{backgroundColor: "white"}}/>
          <div style={{paddingLeft: "auto", paddingLeft: "10%"}}>
          <div style={{textAlign: "left", float: "left"}}>
            <h3><u>About You</u></h3>
          <p>
            Name:{" "}
            {(this.props.location.state.user).toUpperCase() +
              " " +
              (this.props.location.state.lname).toUpperCase()}
          </p>
          <p>
            Email:{" "}
            {(this.props.location.state.email)}
          </p>
          <p>
            Phone Number:{" "}
            {(this.props.location.state.phonenumber)}
          </p>
          <p>
            License Number:{" "}
            {(this.props.location.state.license)}
          </p>
          <p>
            State:{" "}
            {(this.props.location.state.state)}
          </p>
          </div>
          <div style={{textAlign: "left", float: "left", marginLeft: "20px"}}>
            <h3><u>Vehicle</u></h3>
          <p>
            Make:{" "}
            {this.props.location.state.make}
          </p>
          <p>
            model:{" "}
            {(this.props.location.state.model)}
          </p>
          <p>
            year:{" "}
            {(this.props.location.state.year)}
          </p>
          <p>
            Color:{" "}
            {(this.props.location.state.color)}
          </p>
          <p>
            License Plate:{" "}
            {(this.props.location.state.plate)}
          </p>
          </div>
          <div style={{textAlign: "left", float: "left", marginLeft: "40px", marginRight: "auto", width: "30%"}}>
            <h3><u>Reservation</u></h3>
          <p>
            Name:{" "}
            {this.props.location.state.parkingData.name}
          </p>
          <p>
            Hours:{" "}
            {(this.props.location.state.parkingData.hours.open + ":00 to " + this.props.location.state.parkingData.hours.close)}
          </p>
          <p>
            Address:{" "}
            {(this.props.location.state.parkingData.address)}
          </p>
          <p>
            Price:{" "}
            {(this.props.location.state.parkingData.price)}
          </p>
          <p>
            Reservation:{" "}
            {(this.props.location.state.parkingData.startReservation+ " to " + this.props.location.state.parkingData.endReservation)}
          </p>
          </div>
          </div>
        </div>
        <div style={{marginLeft: "auto", marginRight: "auto"}}>
        <Button className="btn btn-primary" name="fix" onClick={this.handleClick}>Need to Fix</Button>&nbsp;&nbsp;&nbsp;
        <Button className="btn btn-primary" name="confirm" onClick={this.handleClick}>Confirm</Button>
        </div>
        
      </div>
       

        
      </div>
    );
  }
}

export default Receipt;

// this.props.location.state.property
