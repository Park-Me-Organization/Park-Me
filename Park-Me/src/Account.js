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
    firebase.auth().onAuthStateChanged(user => {
    
      if (user) {
        this.setState({
        user: user.displayName,
        email: user.email,
        phonenumber: user.DB_phonenumber
        })
        console.log(this.state.user)
        console.log(this.state.email)

      }
    });
  }
  
  render() {
    
    return (
      <div class="center">
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