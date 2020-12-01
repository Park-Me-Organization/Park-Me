import React, { Component } from "react";
import firebase from "./Firebase";
import { navigate } from "@reach/router"; //move from different pages
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from "./Navigation";
import Login from "./Login";
import Mapbox from "./Mapbox";
import Register from "./Register";
import UserInfo from "./UserInfo";
import VehicleDetails from "./VehicleDetails";
import TransactionHandle from "./TransactionHandle.js";
import Receipt from "./Receipt.js";
import Confirmation from "./Confirmation.js";
import ReservationDetails from "./ReservationDetails.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      //state object
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        console.log(FBUser);
        this.setState({
          //this statement needs review
          // user: FBUser,
          user: FBUser.displayName,
          userID: FBUser.uid
        });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate("/");
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("./");
      });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navigation user={this.state.user} logOutUser={this.logOutUser} />
          </div>
          <Switch>
            <Route exact path="/Park-Me" component={Mapbox} />
            <Route path="/login" component={Login} user={this.state.user} />
            <Route
              path="/register"
              component={Register}
              registerUser={this.registerUser}
            />
            <Route
              path="/reservationdetails"
              render={props => <ReservationDetails {...props} />}
            />
            <Route path="/userinfo" render={props => <UserInfo {...props} />} />
            <Route
              path="/vehicleDetails"
              render={props => <VehicleDetails {...props} />}
            />
            <Route
              path="/confirmation"
              render={props => <Confirmation {...props} />}
            />
            <Route
              path="/transactionHandle"
              render={props => <TransactionHandle {...props} />}
            />
            <Route path="/receipt" render={props => <Receipt {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

//render={(props) => <Reserve parkingLot={name: "", location: "",}/>} component={Reserve}
