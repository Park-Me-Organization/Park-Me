import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from './Firebase'
import {Router} from '@reach/router'
import Register from './Register'

class App extends Component {

  constructor(){
    super();
    this.state = {
      user:null
    };
  }

  componentDidMount() {
  const ref = firebase.database().ref('user'); //reference to DB 
  ref.on('value', snapshot => {
    let FBUser = snapshot.val();
    this.setState ({user:FBUser});
  })
} 

  render(){ 
    
    return (
    <div className="container text-center">
    <div className="row justify-content-center">
    <div className="col-10 col-md-10 col-lg-8 col-xl-7">
      <div className="display-4 text-primary mt-3 mb-2">
        Park Me!
      </div>
      <p className="lead">
        Find parking, reserve and pay in advance.
      </p>

      <a href="/register" className="btn btn-outline-primary mr-2">
        Register
      </a>
      <a href="/login" className="btn btn-outline-primary mr-2">
        Log In
      </a>
      <Router>
        <Register path="/register"/>
      </Router>
    </div>
  </div>
</div>
  );
}
}
export default App;
