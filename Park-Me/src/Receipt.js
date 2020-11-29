import React, { Component } from "react";
import FormError from "./FormError";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
      <div>
        <h1>name</h1>
      </div>
    );
  }
}

export default Receipt;

// this.props.location.state.property
