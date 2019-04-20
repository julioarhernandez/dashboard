import React, { Component } from 'react';
import Header from "./Header";
import Mainlink from "./Mainlink";
import DealDetail from "./DealDetail";

import withAuth from './withAuth';

class DealsDetails extends Component {
 componentDidMount(){
     console.log();
 }
  render() {
    return(
      <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="deals" role={this.props.user.payload.type}/>
        <DealDetail cardId={this.props.match.params.cid} bizId={this.props.match.params.bid}/>
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

export default withAuth(DealsDetails);
