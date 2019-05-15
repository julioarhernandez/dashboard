import React, { Component } from 'react';
import Header from "./Header";
import Mainlink from "./Mainlink";
import DealsCards from "./DealsCards";

import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();

class Deals extends Component {
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
 }
  render() {
    return(
      <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="deals" role={this.props.user.payload.type}/>
        <DealsCards />
      </React.Fragment>
    //   <div className="Deals">
    //       {/* <div className="Deals-header">
    //           <img src={logo} className="Deals-logo" alt="logo" />
    //           <h2>Welcome {this.props.user.payload.email}</h2>
    //       </div> */}
    //       <p className="Deals-intro">
    //           <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
    //       </p>
    // </div>
  );
  }
}

export default withAuth(Deals);
