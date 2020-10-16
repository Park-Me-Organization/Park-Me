import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from './Firebase'
import {navigate, Router} from '@reach/router'
import Register from './Register'
import Navigation from './Navigation';
import Login from './Login';

class App extends Component {


  constructor(props){
    super(props);
    this.state = {    //state object
      user: null      
    };
  }


  componentDidMount() {
/*     firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser
        });
      }
    }) */
  }

registerUser = username => {
  firebase.auth().onAuthStateChanged(FBUser => {
    FBUser.updateProfile({
      displayName: username
    }).then(() => {
      this.setState({
        user: FBUser
      });
    });
  });
};

logOutUser = e => {
  e.preventDefault();
  this.setState({
    user: null
  });

  firebase
    .auth()
    .signOut();
};

  render(){ 
    
    return (
    <div>
      <div><Navigation user={this.state.user}/></div>
    <div className="container text-center">
     
    <div className="row justify-content-center">
      
    <div className="col-10 col-md-10 col-lg-8 col-xl-7">
    
      <div className="display-4 text-primary mt-3 mb-2">
        Park Me!
      </div>
      <p className="lead">
        Find parking, reserve and pay in advance.
      </p>
      
      <Router>
      <Login path="/login" user= {this.state.user}/>
        <Register path="/register" user= {this.registerUser}/>
      </Router>
    </div>
  </div>
</div>
</div>
  );
}
}
export default App;
