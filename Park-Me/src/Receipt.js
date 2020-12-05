import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import QRious from "qrious";

var qrcode;
class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrcode: "",
      toHome: false,
      errorMessage: null
    };
    console.log(this.props.location.state.finalRegistrationInfo);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    var result = "";
    var length = 5;
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.setState({ qrcode: result });

    console.log("qrcode in function:", this.state.qrcode);
    var qr = new QRious({
      element: document.getElementById("qr-code"),
      foreground: "black",
      size: 200
    });

    qr.set({
      foreground: "black",
      size: 200,
      value: qrcode
    });

    console.log("qrcode state:", qrcode);
  }

  handleClick(e) {
    this.setState({ toHome: true });
  }

  render() {
    if (this.state.toHome === true) {
      return (
        <Redirect
          to={{
            pathname: "/Park-Me"
          }}
        />
      );
    }

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
              Thank You for Your Reservation!
            </h1>
            <p>
              Your confirmation number is:{" "}
              <b id="confirmation"> {this.state.qrcode} </b>
            </p>
            <canvas id="qr-code"></canvas>

            <hr style={{ backgroundColor: "white" }} />
            <div style={{ paddingLeft: "auto", paddingLeft: "10%" }}>
              <div style={{ textAlign: "left", float: "left" }}>
                <h3>
                  <u>About You</u>
                </h3>
                <p>
                  Name:{" "}
                  {this.props.location.state.finalRegistrationInfo.user.toUpperCase() +
                    " " +
                    this.props.location.state.finalRegistrationInfo.lname.toUpperCase()}
                </p>
                <p>
                  Email: {this.props.location.state.finalRegistrationInfo.email}
                </p>
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
                      .parkingData.total}
                </p>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Button
              className="btn btn-primary"
              name="confirm"
              onClick={this.handleClick}
            >
              Back Home
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Receipt;

// this.props.location.state.property
