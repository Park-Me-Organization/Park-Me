import React, { Component } from "react";
import FormError from "./FormError";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

class Confirmation extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state.parkingData)
    this.state = {
      user: this.props.location.state.user,
      lname: this.props.location.state.lname,
      email: this.props.location.state.email,
      phonenumber: this.props.location.state.phonenumber,
      license: this.props.location.state.license,
      state: this.props.location.state.state,
      parkingData: this.props.location.state.parkingData,
      vehicleMake: this.props.location.state.vehicleMake,
      vehicleModel: this.props.location.state.vehicleModel,
      vehicleYear: this.props.location.state.vehicleYear,
      vehicleColor: this.props.location.state.vehicleColor,
      vehiclePlate: this.props.location.state.vehiclePlate,
      vehiclePlate: this.props.location.state.plate, toTransactionHandle: false, toReservationDetails: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    var itemName = e.target.name;

    if(itemName == "fix"){
      this.setState({toReservationDetails: true})
    }else{
      this.setState({toTransactionHandle: true})
    }
  }
  handleChange(e) {
    //Collects the value for each item name

    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    var registrationInfo = {
      user: this.props.location.state.user,
      lname: this.props.location.state.lname,
      email: this.props.location.state.email,
      phonenumber: this.props.location.state.phonenumber,
      license: this.props.location.state.license,
      state: this.props.location.state.state,
      parkingData: this.props.location.state.parkingData,
      parkingData: this.props.location.state.parkingData,
      vehicleMake: this.props.location.state.vehicleMake,
      vehicleModel: this.props.location.state.vehicleModel,
      vehicleYear: this.props.location.state.vehicleYear,
      vehicleColor: this.props.location.state.vehicleColor,
      vehiclePlate: this.props.location.state.vehiclePlate
    };
    this.setState({
      toVehicleDetails: true,
      finalRegistrationInfo: registrationInfo
    });
    console.log("finalRegistrationInfo: ", this.state.finalRegistrationInfo);
    e.preventDefault();
  }

  render() {
    if (this.state.toTransactionHandle === true) {
      return (
        <Redirect
          to={{
            pathname: "/TransactionHandle",
            state: this.state
          }}
        />
      );
    }else if(this.state.toReservationDetails === true) {
      return (
        <Redirect
          to={{
            pathname: "/reservationdetails",
            state: this.state
          }}
        />
      );
        }
    return (
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
            {this.props.location.state.vehicleMake}
          </p>
          <p>
            model:{" "}
            {(this.props.location.state.vehicleModel)}
          </p>
          <p>
            year:{" "}
            {(this.props.location.state.vehicleYear)}
          </p>
          <p>
            Color:{" "}
            {(this.props.location.state.vehicleColor)}
          </p>
          <p>
            License Plate:{" "}
            {(this.props.location.state.vehiclePlate)}
          </p>
          </div>
          <div style={{textAlign: "left", float: "left", marginLeft: "40px", marginRight: "auto", width: "30%"}}>
            <h3><u>Reservation</u></h3>
          <p>
            Name:{" "}
            {this.props.location.state.parkingData.lotName}
          </p>
          <p>
            {console.log(this.props.location.state.parkingData.hours)}
            Hours:{" "}
            {(this.props.location.state.parkingData.hours.opening + ":00 to " + this.props.location.state.parkingData.hours.closing + ":00")}
          </p>
          <p>
            Address:{" "}
            {(this.props.location.state.parkingData.address)}
          </p>
          <p>
            Price:{" "}
            {("$" + this.props.location.state.parkingData.price)}
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
    );
  }
}

export default Confirmation;

// this.props.location.state.property
