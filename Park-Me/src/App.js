import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from './Firebase'
import {navigate, Router} from '@reach/router'
import Register from './Register'
import Navigation from './Navigation';
import Login from './Login';
import Mapbox from './Mapbox';

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
      navigate('./app');
    });
};

  render(){ 
    
    return (
    <div>

        <div><Navigation user={this.state.user} logOutUser={this.logOutUser}/></div>
        <Mapbox/>
 
  
    
      <Router>
      <Login path="/login" user= {this.state.user}/>
        <Register path="/register" user= {this.registerUser}/>
        <Mapbox path='/mapbox'/>
      </Router>
    </div>

  );
}
}
export default App;
