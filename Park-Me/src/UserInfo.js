import React, { Component } from "react";
import FormError from "./FormError";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getMatches, isValid } from "driver-license-validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

var validation = function(inputString, regex) {
  var alpha = true;
  if (regex === "license") {
    return isValid(inputString);
  }
  for (var i = 0; i < inputString.length; i++) {
    if (!regex.test(inputString.charAt(i))) {
      return false;
    } else {
      continue;
    }
  }
  return alpha;
};

class UserInfo extends Component {
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
      toVehicleDetails: false,
      errorMessage: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this); //constructor <-handle change
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect(e) {
    this.setState({
      state: e.target.value
    });
  }
  handleChange(e) {
    // item being modified in input
    const itemName = e.target.name;
    // input
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
    if (
      validation(itemValue, /^[a-zA-Z -]*$/i) == false &&
      itemName == "user"
    ) {
      this.setState({
        errorMessage:
          'Incorrect format for First Name. Only Letters, spaces " ", and hyphens "-" are accepted.'
      });
    } else if (
      validation(itemValue, /^[a-zA-Z -]*$/i) == false &&
      itemName == "lname"
    ) {
      this.setState({
        errorMessage:
          'Incorrect format for Last Name. Only Letters, spaces " ", and hyphens "-" are accepted.'
      });
    } else if (
      validation(itemValue, "license") == false &&
      itemName == "license"
    ) {
      this.setState({
        errorMessage: "Incorrect format for License number. Please try again."
      });
    } else {
      this.setState({
        errorMessage: null
      });
    }
  }

  handleSubmit(e) {
    var registrationInfo = {
      user: this.state.user,
      lname: this.state.lname,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      license: this.state.license,
      state: this.state.state,
      parkingData: this.props.location.state.parkingData
    };
    this.setState({
      toVehicleDetails: true,
      finalRegistrationInfo: registrationInfo
    });
    e.preventDefault();
  }

  render() {
    if (this.state.toVehicleDetails === true) {
      return (
        <Redirect
          to={{
            pathname: "/vehicleDetails",
            state: this.state.finalRegistrationInfo
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
            <div
              className="card bg-light"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "650px"
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
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    required
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </section>
                <section className="form-group">
                  <PhoneInput
                    country={"us"}
                    placeholder="phone number"
                    inputStyle={{ width: "100%" }}
                    value={this.state.phonenumber}
                    onChange={phonenumber => this.setState({ phonenumber })}
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
                    <select
                      name="state"
                      className="custom-select mr-sm-2"
                      value={this.state.state}
                      onChange={this.handleSelect}
                    >
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </section>
                </div>
                <div className="form-group text-right mb-0">
                  <Button
                    style={{
                      backgroundColor: "#1A2637",
                      borderColor: "white",
                      fontFamily: "Roboto Slab"
                    }}
                    type="submit"
                  >
                    Register
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

export default UserInfo;

//first&last name: /^[a-zA-Z -]*$/i
