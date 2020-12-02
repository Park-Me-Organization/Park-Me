import React, { Component } from "react";
import firebase from "./Firebase";

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
      <div>
        <h3>My account</h3>
          <div>
            <p>
            Username: {this.state.user}
            </p>
            <p>Email: {this.state.email}</p>
            <p>Phone: {this.state.phonenumber}</p>

          </div>
          <div>
            My reservations
          </div>
      </div>
    );
  }
}

export default Account;