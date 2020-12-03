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
import Account from "./Account";
import Email from "./Email";

/*  var database = firebase.database();
var ref = database.ref('users');
var data = {
    DB_user: "",
    DB_userID: "",
    
} */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      displayName: null,
      userID: null,
      lname:'',
      email: '',
      phonenumber:'',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          //HERE IS WHERE THE FIREBASE USER SET 
          user: FBUser.displayName,
          userID: FBUser.uid
        });
        
        //Data insertion into DB
        // data.DB_user = this.state.user;
        //data.DB_userID = this.state.userID;
        //ref.push(data)
      }
    });
  }
  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser.displayName,
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
            <Route
              exact
              path="/Park-Me"
              component={Mapbox}
              render={props => <Mapbox {...props} />}
            />
            <Route path="/login" component={Login} user={this.state.user} />
            <Route
              path="/register"
              component={Register}
              registerUser={this.state.user}
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
              path="/TransactionHandle"
              render={props => <TransactionHandle {...props} />}
            />
            <Route path="/receipt" render={props => <Receipt {...props} />} />
            <Route 
            path="/account" 
            component={Account}
            render= {props => <Account {...props} />}/>

            {/* <Route 
            path="/Email" 
            component={Email}
            render= {props => <Account {...props} />}/> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

//render={(props) => <Reserve parkingLot={name: "", location: "",}/>} component={Reserve}
