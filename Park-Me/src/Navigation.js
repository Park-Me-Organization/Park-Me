import React, { Component } from "react";
// import Logo from "./Parking-Logo.svg";
import Logo from "./Assets/Parking-Logo.svg";
import { NavLink } from "react-router-dom";

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1)
}
class Navigation extends Component {
  render() {
    const { user, logOutUser } = this.props;

    return (
      <div>
        {" "}
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
            <NavLink className="navbar-brand" to="/Park-Me">
              <img src={Logo} width="30" height="30" alt="Logo" />
            </NavLink>

            <div className="navbar-nav ml-auto">
              <NavLink className="nav-item nav-link" to="/account">
                {" "}
                {this.props.user != null ? capitalize(this.props.user) : console.log("no user")}
              </NavLink>

              {user == null && (
                <NavLink className="nav-item nav-link" to="/login">
                  Log In
                </NavLink>
              )}

              {user == null && (
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              )}
              {user && (
                <NavLink
                  className="nav-item nav-link"
                  to="/"
                  onClick={e => logOutUser(e)}
                >
                  Log Out
                </NavLink>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
