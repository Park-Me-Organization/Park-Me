import React, {Component} from 'react';
import FormError from './FormError';
import firebase from './Firebase'

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname:'',
            email: '',
            phonenumber:'',
            passOne: '',
            passTwo: '',
            errorMessage: null
            };
            this.handleChange = this.handleChange.bind(this); //constructor <-handle change
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
    handleChange(e){        //Collects the value for each item name
    
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({[itemName]: itemValue}, () => {
         if (this.state.passOne !== this.state.passTwo){
             this.setState({errorMessage:'Passwords do not match'});
         }   
         else {
             this.setState({errorMessage: null});
         }
        });
    }    

    handleSubmit(e){
        var registrationInfo = {
        fname : this.state.fname, 
        lname: this.state.lname,
        email: this.state.email,
        phonenumber : this.state.phonenumber,
        passOne : this.state.passOne
        }

        e.preventDefault();
        //push an authentication event into the fireabse database
        
        firebase
        .auth()
        .createUserWithEmailAndPassword(
            registrationInfo.email,registrationInfo.passOne
        ).then(()=>{
            this.props.registerUser(registrationInfo.fname);
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
        return (
            <form className="mt-3" onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h3 className="font-weight-light mb-3">Register</h3>
                                    <div className="form-row">
                                            {this.state.errorMessage !== null ? (
                                            <FormError theMessage = {this.state.errorMessage}
                                            />
                                            ): null}
                                        <section className="col-sm-6 form-group">
                                            <label
                                                className="form-control-label sr-only"
                                                htmlFor="fname"
                                            >
                                                Name
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="fname"
                                                placeholder="First Name"
                                                name="fname"
                                                required
                                                value = {this.state.fname}
                                                onChange = {this.handleChange}
                                                />
                                        </section>
                                        <section className="col-sm-6 form-group">
                                            <label
                                                className="form-control-label sr-only"
                                                htmlFor="lname"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="lname"
                                                placeholder="Last Name"
                                                name="lname"
                                                required
                                                value = {this.state.lname}
                                                onChange = {this.handleChange}
                                                />
                                        </section>
                                    </div>
                                    <section className="form-group">
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            placeholder="Email Address"
                                            required
                                            name="email" 
                                            value = {this.state.email}
                                                onChange = {this.handleChange}
                                            />
                                    </section>
                                    <section className="form-group">
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="phonenumber"
                                        >
                                            PhoneNumber
                                        </label>
                                        <input
                                            className="form-control"
                                            type="tel"
                                            id="phonenumber"
                                            placeholder="Phone Number"
                                            required
                                            name="phonenumber" 
                                            value = {this.state.phonenumber}
                                                onChange = {this.handleChange}
                                            />
                                    </section>
                                    <div className="form-row">
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="passOne"
                                                placeholder="Password" 
                                                value = {this.state.passOne}
                                                onChange = {this.handleChange}
                                                />
                                        </section>
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                required
                                                name="passTwo"
                                                placeholder="Retype Password" 
                                                value = {this.state.passTwo}
                                                onChange = {this.handleChange}
                                                />
                                        </section>
                                    </div>
                                    <div className="form-group text-right mb-0">
                                        <button className="btn btn-primary" type="submit">
                                                                                Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    }

export default Register;