import React, {Component} from 'react';


class Navigation extends Component {

render(){
        return(
<nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
  <div className="container-fluid">
    <a href="/" className="navbar-brand">
      Park Me
    </a>
    <div className="navbar-nav ml-auto">
        <a className="nav-item nav-link" href="/login">
          Log in
        </a>
        <a className="nav-item nav-link" href="/register">
          Register
        </a>
        <a className="nav-item nav-link" href="/login">
          Log out
        </a>
    </div>
  </div>
</nav>
        )
    }
}

export default Navigation;