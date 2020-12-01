import React, { Component } from "react";
import FormError from "./FormError";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

class TransactionHandle extends Component {
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
      license: this.state.license,
      state: this.state.state,
      parkingData: this.props.location.state.parkingData,
      vehicleMake: this.props.location.state.vehicleMake,
      vehicleModel: this.props.location.state.vehicleModel,
      vehicleYear: this.props.location.state.vehicleYear,
      vehicleColor: this.props.location.state.vehicleColor,
      vehiclePlate: this.props.location.state.vehiclePlate
    };
    this.setState({
      toReceipt: true,
      finalRegistrationInfo: registrationInfo,
    });
    console.log(registrationInfo);
    e.preventDefault();
  }

  render() {
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
    return (
      <form
        className="main-form"
        style={{ marginTop: "2%" }}
        onSubmit={this.handleSubmit}
      >
        <div className="container" style={{ padding: "0px" }}>
          <div className="row">
            {console.log(
              "finalRegistrationInfo: ",
              this.props.location.state.finalRegistrationInfo
            )}
            <div
              className="card bg-light"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "650px",
              }}
            >
              <div className="card-body">
                <h3 className="font-weight-light mb-3">
                  Let's get some details
                </h3>
                <div className="form-row">
                  {this.state.errorMessage !== null ? (
                    <FormError theMessage={this.state.errorMessage} />
                  ) : null}
                  <section className="col-sm-6 form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="user"
                    >
                      Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="user"
                      placeholder="First Name"
                      name="user"
                      required
                      value={this.state.user}
                      onChange={this.handleChange}
                    />
                  </section>
                  <section className="col-sm-6 form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="lname"
                    >
                      Last Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="lname"
                      placeholder="Last Name"
                      name="lname"
                      required
                      value={this.state.lname}
                      onChange={this.handleChange}
                    />
                  </section>
                </div>
                <section className="form-group">
                  <label className="form-control-label sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    placeholder="Credit Card Number"
                    required
                    name="number"
                    value={this.state.number}
                    onChange={this.handleChange}
                  />
                </section>
                <section className="form-group">
                  <label
                    className="form-control-label sr-only"
                    htmlFor="phonenumber"
                  >
                    PhoneNumber
                  </label>
                  <input
                    className="form-control"
                    type="tel"
                    id="phonenumber"
                    placeholder="123-456-7890"
                    required
                    name="phonenumber"
                    value={this.state.phonenumber}
                    onChange={this.handleChange}
                  />
                </section>
                <div className="form-row">
                  <section className="col-sm-6 form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="license"
                      placeholder="License Number"
                      value={this.state.license}
                      onChange={this.handleChange}
                    />
                  </section>
                  <section className="col-sm-6 form-group">
                    <input
                      className="form-control"
                      type="text"
                      required
                      name="state"
                      placeholder="License State"
                      value={this.state.state}
                      onChange={this.handleChange}
                    />
                  </section>
                </div>
                <div className="form-group text-right mb-0">
                  <Button
                    style={{
                      backgroundColor: "#1A2637",
                      borderColor: "white",
                      fontFamily: "Roboto Slab",
                    }}
                    type="submit"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default TransactionHandle;

// this.props.location.state.property
