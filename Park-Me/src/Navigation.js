import React, { Component } from "react";
import Logo from "./Parking-Logo.svg";

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
          <a className="navbar-brand" href="#">
            <img
              src={Logo}
              width="30"
              height="30"
            />
          </a>

          <div className="navbar-nav ml-auto">
            <a className="nav-item nav-link" href="/login">
              {this.props.user}
            </a>
            {user == null && (
              <a className="nav-item nav-link" href="/login">
                Log in
              </a>
            )}

            {user == null && (
              <a className="nav-item nav-link" href="/register">
                Register
              </a>
            )}
            {user && (
              <a
                className="nav-item nav-link"
                href="/login"
                onClick={(e) => logOutUser(e)}
              >
                Log out
              </a>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
