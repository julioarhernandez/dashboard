import React, { Component } from 'react';
import AuthService from './AuthService';
import logo from './images/dealby-logo.svg';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
        this.state = {
            username: '',
            password: ''
          };

    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
    render() {
        return (
            <div className="login -center">
                <div className="login-card">
                    <div className="login-logo">
                        <img src={logo} alt="Dealby logo" />
                    </div>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input
                            className="form-item"
                            placeholder="Email goes here..."
                            name="username"
                            id="username"
                            autoComplete="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">PASSWORD</label>
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        </div>
                        <div className="form-group">
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }
}

export default Login;