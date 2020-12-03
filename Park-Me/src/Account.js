import React, { Component } from "react";
import firebase from "./Firebase";
import "./App.css";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      lname: "",
      email: "",
      phonenumber: "",
      license: "",
      state: "",

    };
  }
    componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
    
      if (FBUser) {
        this.setState({
        user: FBUser.displayName,
        email: FBUser.email,
        phonenumber: FBUser.DB_phonenumber

        })
        console.log(this.state.FBUser)
        console.log(this.state.email)
        console.log(FBUser.uid)

        const userreference = firebase.database().ref().child("users");
        userreference.on('value', (snapshot) =>{
        console.log(snapshot.val());
      })
      }
      
     
      
      

    });
  }
  
  render() {
    
    return (
      <div className="center">
        <h3>My account</h3>
          <div>
            <p>
            <strong>Username: </strong>{this.state.user}
            </p>
            <p><strong>Email: </strong> {this.state.email}</p>

          </div>
          <div>
            <h3>My reservations</h3>
          </div>
      </div>
    );
  }
}

export default Account;