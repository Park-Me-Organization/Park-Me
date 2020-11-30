import React, { Component } from "react";
import FormError from "./FormError";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import carMake from "./Data/CarMake.json";
import carModels from "./Data/CarModels.json";

console.log("make: ", carMake);
console.log("models: ", carModels);

const years = Array.from(new Array(80), (val, index) =>
  (2020 - index).toString()
);

class VehicleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      lname: "",
      email: "",
      phonenumber: "",
      license: "",
      state: "",
      make: "",
      model: "",
      year: "",
      color: "",
      finalRegistrationInfo: {},
      toConfirmation: false,
      errorMessage: null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this); //constructor <-handle change
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect(e) {
    this.setState({
      make: e.target.value
    });
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
      vehicleMake: this.state.make,
      vehicleModel: this.state.model,
      vehicleYear: this.state.year,
      vehicleColor: this.state.color
    };
    console.log("registrationInfo: ", registrationInfo);
    this.setState({
      toConfirmation: true,
      finalRegistrationInfo: registrationInfo
    });
    e.preventDefault();
  }

  render() {
    if (this.state.toConfirmation === true) {
      return (
        <Redirect
          to={{
            pathname: "/confirmation",
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
                  Tell us about that ride
                </h3>
                <div className="form-row">
                  {this.state.errorMessage !== null ? (
                    <FormError theMessage={this.state.errorMessage} />
                  ) : null}
                  <section className="col-sm-6 form-group">
                    <select
                      name="state"
                      className="custom-select my-1 mr-sm-2"
                      value={this.state.make}
                      onChange={this.handleSelect}
                    >
                      {carMake.map(car => (
                        <option value={car}>{car}</option>
                      ))}
                    </select>
                  </section>
                  <section className="col-sm-6 form-group">
                    <select
                      name="state"
                      className="custom-select my-1 mr-sm-2"
                      value={this.state.year}
                      onChange={this.handleSelect}
                    >
                      {years.map(year => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </section>
                </div>

                <div className="form-row">
                  <section className="col-sm-6 form-group">
                    <select
                      name="state"
                      className="custom-select my-1 mr-sm-2"
                      value={this.state.make}
                      onChange={this.handleSelect}
                    >
                      {}
                    </select>
                  </section>
                  <section className="col-sm-6 form-group">
                    <select
                      name="state"
                      className="custom-select my-1 mr-sm-2"
                      value={this.state.year}
                      onChange={this.handleSelect}
                    >
                      {years.map(year => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </section>
                </div>

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
                    placeholder="phone number"
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
                    <select
                      name="state"
                      className="custom-select my-1 mr-sm-2"
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

export default VehicleDetails;

// this.props.location.state.property
