import React, {Component} from 'react';

class Navigation extends Component {


render(){

  const {user, logOutUser} = this.props;

        return(
<nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
<style>
            {
              "\
        .bg-primary{\
          background-color: black;\
        }\
      "
  
            }
          </style>
  <div className="container-fluid">
    <a href="/" className="navbar-brand">
      Park Me
    </a>
    <div className="navbar-nav ml-auto">
    <a className="nav-item nav-link" href="/login">
          {this.props.user}
        </a>
        {user == null && (<a className="nav-item nav-link" href="/login">
          Log in
        </a>)}

        {user == null &&(<a className="nav-item nav-link" href="/register">
          Register
        </a>
        )}
        {user &&(<a className="nav-item nav-link" href="/login" onClick ={e => logOutUser(e)}>
          Log out
        </a>)}
    </div>
  </div>
</nav>
        )
    }
}

export default Navigation;