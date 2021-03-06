import React, {Component} from 'react';
import firebase from './Firebase';
import FormError from './FormError';
import './App.css';
import { Redirect } from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null
            };
            this.handleChange = this.handleChange.bind(this); //constructor <-handle change
            this.handleSubmit = this.handleSubmit.bind(this);
        }

    handleChange(e){        //Collects the value for each item name

        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({[itemName]: itemValue});
    }

    handleSubmit(e){
        var registrationInfo = {
        email: this.state.email,
        password : this.state.password
        }
        
        this.setState({
          toHomePage: true,
//          user: registrationInfo.user,
        });
        
        e.preventDefault();
        //push an authentication event into the fireabse database

        firebase
        .auth()
        .signInWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password
        )
        .then(()=>{
        })
        .catch(error =>{
            if (error.message !== null){
                this.setState({errorMessage: error.message});
                
            } else{
                this.setState({errorMessage: null});
            }
        })
    }

    render(){
      if (this.state.toHomePage === true) {
        return (
          <Redirect
            to={{
              pathname: "/Park-Me",
              state: this.state.user,
            }}
          />
        );
      }       
        return(
          <form className="main-form" style={{marginTop: "2%"}} onSubmit={this.handleSubmit}>
            <div className="container" style={{padding: "0px"}} >
              <div className="row" >
                  <div className="card bg-light" style={{marginLeft: "auto", marginRight: "auto", width: "500px"}}>
                    <div className="card-body">
                      <h3 className="font-weight-light mb-3">Log in</h3>
                      <section className="form-group">
                      {this.state.errorMessage !== null ? (
                                                      <FormError theMessage = {this.state.errorMessage}
                                                      />
                                                      ): null}
                        <label
                          className="form-control-label sr-only"
                          htmlFor="Email">
                          Email
                        </label>
                        <input
                          required
                          className="form-control"
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </section>
                      <section className="form-group">
                        <input
                          required
                          className="form-control"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleChange}

                        />
                      </section>
                      <div className="form-group text-right mb-0">
                        <button className="btn btn-primary" type="submit">
                          Log in
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </form>
        )
    }
}

export default Login;
