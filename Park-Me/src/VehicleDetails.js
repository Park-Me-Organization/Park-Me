import React, { Component } from "react";
import FormError from "./FormError";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import carMake from "./Data/CarMake.json";
import carModels from "./Data/CarModels.json";

// console.log("make: ", carMake);
// console.log("models: ", carModels);

var validation = function(inputString, regex) {
  var alpha = true;
  for (var i = 0; i < inputString.length; i++) {
    if (!regex.test(inputString.charAt(i))) {
      return false;
    } else {
      continue;
    }
  }
  return alpha;
};

const years = Array.from(new Array(80), (val, index) =>
  (2020 - index).toString()
);

class VehicleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.location.state.user,
      lname: this.props.location.state.lname,
      email: this.props.location.state.email,
      phonenumber: this.props.location.state.phonenumber,
      license: this.props.location.state.license,
      state: this.props.location.state.state,
      make: "",
      model: "",
      year: "",
      color: "",
      plate: "",
      finalRegistrationInfo: {},
      toConfirmation: false,
      errorMessage: null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this); //constructor <-handle change
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue }, () => {
      if (validation(itemValue, /^[0-9A-Z]\{5,7\}/i) == false) {
        this.setState({
          error: "Incorrect License Plate Number. Please try again"
        });
      }
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
      user: this.props.location.state.user,
      lname: this.props.location.state.lname,
      email: this.props.location.state.email,
      phonenumber: this.props.location.state.phonenumber,
      license: this.props.location.state.license,
      state: this.props.location.state.state,
      parkingData: this.props.location.state.parkingData,
      vehicleMake: this.state.make,
      vehicleModel: this.state.model,
      vehicleYear: this.state.year,
      vehicleColor: this.state.color,
      vehiclePlate: this.state.plate
    };
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
                      name="make"
                      className="custom-select my-1 mr-sm-2"
                      value={this.state.make}
                      onChange={this.handleSelect}
                    >
                      <option value="Make">Make</option>
                      {carMake.map(car => (
                        <option value={car}>{car}</option>
                      ))}
                    </select>
                  </section>
                  <section className="col-sm-6 form-group">
                    <select
                      name="year"
                      className="custom-select my-1 mr-sm-2"
                      value={this.state.year}
                      onChange={this.handleSelect}
                    >
                      <option value="Year">Year</option>
                      {years.map(year => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </section>
                </div>

                <div className="form-row">
                  {/* <section className="col-sm-6 form-group">
                    <select
                      name="model"
                      className="custom-select mr-sm-2"
                      value={this.state.model}
                      onChange={this.handleSelect}
                    >
                      {console.log("make: ", carModels)}
                      {this.state.make != null
                        ? carModels.forEach(make => {
                            if (this.state.make === make["brand"]) {
                              make["models"].map(model => (
                                <div>
                                  {console.log("inside")}
                                <option id="makeID" value={model}>{model}</option>
                                </div>
                              ));
                            }
                          })
                        : this.setState({
                            error: "please select a make first"
                          })}
                          
                    </select>
                  </section> */}

                  <section className="form-group col-sm-6">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="phonenumber"
                    >
                      color
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="model"
                      placeholder="Model"
                      required
                      name="model"
                      value={this.state.model}
                      onChange={this.handleChange}
                    />
                  </section>

                  <section className="form-group col-sm-6">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="phonenumber"
                    >
                      color
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="phonenumber"
                      placeholder="Color"
                      required
                      name="color"
                      value={this.state.color}
                      onChange={this.handleChange}
                    />
                  </section>
                </div>

                <section className="form-group">
                  <label
                    className="form-control-label sr-only"
                    htmlFor="phonenumber"
                  >
                    LicensePlateNumber
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="LicensePlateNumber"
                    placeholder="License Plate Number"
                    required
                    name="plate"
                    value={this.state.plate}
                    onChange={this.handleChange}
                  />
                </section>

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
