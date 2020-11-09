import React, { Component } from "react";
// import Logo from "./Parking-Logo.svg";
import Logo from "./Assets/Parking-Logo.svg"
import {Link} from '@reach/router';


class Navigation extends Component {
  render() {
    
    const { user, logOutUser } = this.props;

    return (
      <nav className="site-nav family-sans navbar navbar-expand navbar-dark higher">
        <style>
          {
            "\
        .navbar{\
          background-color: Black;\
        }\
      "
          }
        </style>

    
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              width="30"
              height="30"
              alt="Logo"
            />
          </Link>

          <div className="navbar-nav ml-auto">
            <Link className="nav-item nav-link" to="/account"> {this.props.user}</Link>
            
            {user == null && (
              <Link className="nav-item nav-link" to="/login">Log In</Link>
            )}

            {user == null && (
              <Link className="nav-item nav-link" to="/register" >Register</Link>
            )}
            {user && (
              <Link className="nav-item nav-link" to="/" onClick={(e) => logOutUser(e)}>Log Out</Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
