import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Confirmation extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state.finalRegistrationInfo);
    this.state = {
      toTransactionHandle: false,
      toReservationDetails: false,
      finalRegistrationInfo: this.props.location.state.finalRegistrationInfo
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    var itemName = e.target.name;

    if (itemName == "fix") {
      this.setState({ toReservationDetails: true });
    } else {
      this.setState({ toTransactionHandle: true });
    }
  }
  handleChange(e) {
    //Collects the value for each item name

    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  render() {
    if (this.state.toTransactionHandle === true) {
      return (
        <Redirect
          to={{
            pathname: "/TransactionHandle",
            state: { finalRegistrationInfo: this.state.finalRegistrationInfo }
          }}
        />
      );
    } else if (this.state.toReservationDetails === true) {
      return (
        <Redirect
          to={{
            pathname: "/reservationdetails"
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
          <hr style={{ backgroundColor: "white" }} />
          <div style={{ paddingLeft: "auto", paddingLeft: "10%" }}>
            <div style={{ textAlign: "left", float: "left" }}>
              <h3>
                <u>About You</u>
              </h3>
              <p>
                Name:{" "}
                {capitalize(
                  this.props.location.state.finalRegistrationInfo.user
                ) +
                  " " +
                  capitalize(
                    this.props.location.state.finalRegistrationInfo.lname
                  )}
              </p>
              <p>Email: {this.state.finalRegistrationInfo.email}</p>
              <p>
                Phone Number:{" "}
                {this.props.location.state.finalRegistrationInfo.phonenumber}
              </p>
              <p>
                License Number:{" "}
                {this.props.location.state.finalRegistrationInfo.license}
              </p>
              <p>
                State: {this.props.location.state.finalRegistrationInfo.state}
              </p>
            </div>
            <div
              style={{ textAlign: "left", float: "left", marginLeft: "20px" }}
            >
              <h3>
                <u>Vehicle</u>
              </h3>
              <p>
                Make:{" "}
                {this.props.location.state.finalRegistrationInfo.vehicleMake}
              </p>
              <p>
                model:{" "}
                {this.props.location.state.finalRegistrationInfo.vehicleModel}
              </p>
              <p>
                year:{" "}
                {this.props.location.state.finalRegistrationInfo.vehicleYear}
              </p>
              <p>
                Color:{" "}
                {this.props.location.state.finalRegistrationInfo.vehicleColor}
              </p>
              <p>
                License Plate:{" "}
                {this.props.location.state.finalRegistrationInfo.vehiclePlate}
              </p>
            </div>
            <div
              style={{
                textAlign: "left",
                float: "left",
                marginLeft: "40px",
                marginRight: "auto",
                width: "30%"
              }}
            >
              <h3>
                <u>Reservation</u>
              </h3>
              <p>
                Name:{" "}
                {
                  this.props.location.state.finalRegistrationInfo.parkingData
                    .parkingData.lotName
                }
              </p>
              <p>
                {console.log(
                  this.props.location.state.finalRegistrationInfo.parkingData
                    .parkingData.hours
                )}
                Hours:{" "}
                {this.props.location.state.finalRegistrationInfo.parkingData
                  .parkingData.hours.opening +
                  ":00 am to " +
                  (this.props.location.state.finalRegistrationInfo.parkingData
                    .parkingData.hours.closing -
                    12) +
                  ":00 pm"}
              </p>
              <p>
                Address:{" "}
                {
                  this.props.location.state.finalRegistrationInfo.parkingData
                    .parkingData.address
                }
              </p>
              <p>
                Reservation:{" "}
                {this.props.location.state.finalRegistrationInfo.parkingData
                  .parkingData.startReservation +
                  " to " +
                  this.props.location.state.finalRegistrationInfo.parkingData
                    .parkingData.endReservation}
              </p>
              <p>
                Price:{" "}
                {"$" +
                  this.props.location.state.finalRegistrationInfo.parkingData
                    .parkingData.price +
                  "/hr"}
              </p>
              <p>
                Total:{" "}
                {"$" +
                  this.props.location.state.finalRegistrationInfo.parkingData
                    .parkingData.total +
                  "/hr"}
              </p>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Button
            className="btn btn-primary"
            name="fix"
            onClick={this.handleClick}
          >
            Need to Fix
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            className="btn btn-primary"
            name="confirm"
            onClick={this.handleClick}
          >
            Confirm
          </Button>
        </div>
      </div>
    );
  }
}

export default Confirmation;
