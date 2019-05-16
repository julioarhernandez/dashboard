import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from "react-router-dom";
import baseUrl from "../helpers/urlHelpers";
import AuthService from './AuthService';
import Header from './Header';
import Mainlink from './Mainlink';


import withAuth from './withAuth';

class User extends Component {
    constructor(){
        super();
    
        this.state = {
            showAlerts: false,
            email: '',
            password: ''
          };
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);

    }
    preventSubmit(e){
        e.preventDefault();
    }
    handleChange(e){
        this.setState(
            {
                showAlerts: false,
                [e.target.name]: e.target.value
            }
        )
    }
    handleFormSubmit(e){
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('email', this.state.email);
        // formData.append('password', this.state.password);
        this.Auth.fetch(`${baseUrl}/api/cards/adduser/`,{
            method: 'POST',
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        }).then(response => {
            if (response.status === 'Success'){
                this.setState({ 
                    showAlerts: true,
                    message: 'Changes saved sucessfully!'
                });
            }else {
                this.setState({ 
                    showAlerts: true,
                    message: 'Error. Please try again!'
                });
            }
        });
    }

  render() {

    return(
        <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="users" role={this.props.user.payload.type}/>
        <div className="UserCard">
            <div className="container -flex-wrap">
                <div className="UserCard-item">
                    <form onSubmit={this.preventSubmit}>
                        <div className="UserCard-body">
                            <div className="UserCard-email">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email" onChange={this.handleChange} value={this.state.email}/>
                            </div>
                            <div className="UserCard-password">
                                <label htmlFor="description">Deal description</label>
                                <input type="password" name="password" id="password" minLength="8" onChange={this.handleChange} value={this.state.password}/>
                            </div>
                        </div>
                        <div className="UserCard-aside">
                            <Link to="#" className="btn btn-blue -block" onClick={this.handleFormSubmit}>
                                Create User
                            </Link>
                        </div>
                    </form>
                    {this.state.showAlerts && 
                    <div className="alert">
                    {this.state.message}
                    </div>}
                </div>
            </div>
         </div>
        </React.Fragment>
    
  );
  }
}

export default withAuth(User);
