import React, {Component} from 'react';
import firebase from './Firebase'
import {navigate} from '@reach/router'
import {Switch,Route} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Navigation from './Navigation';
import Login from './Login';
import Mapbox from './Mapbox';
import Register from './Register'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {    //state object
      user: null,
      displayName: null,
      userID: null    
    };
  }


  componentDidMount() {
    
     firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        console.log(FBUser)
        this.setState({
          //this statement needs review
         // user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      }
    })
  }

registerUser = username => {
  firebase.auth().onAuthStateChanged(FBUser => {
    FBUser.updateProfile({
      displayName: username
    }).then(() => {
      this.setState({
        user: FBUser,
        displayName: FBUser.displayName,
        userID: FBUser.uid});
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
    .signOut().then(() =>{
      navigate('./');
    });
};

  render(){ 
    
    return (
    <div>

         <div>
         <Navigation user={this.state.user} logOutUser={this.logOutUser}/>
          </div>
       <Switch>
        <Route exact path="/" component={Mapbox}/>
        <Route path="/login" component={Login} user= {this.state.user}/>
        <Route path="/register" component={Register} user= {this.registerUser}/>
        </Switch>
    </div>

  );
}
}
export default App;
