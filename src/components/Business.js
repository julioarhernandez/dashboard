import React, { Component } from 'react';
// import axios from "axios";
import baseUrl from "../helpers/urlHelpers";
import Header from "./Header";
import Mainlink from "./Mainlink";
import BusinessInfo from "./BusinessInfo";
import AuthService from './AuthService';
import withAuth from './withAuth';

class Business extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      bizs: []
    };
  }
  
  componentDidMount() {
    // Redirect to admin route if admin
    if (this.props.user.payload.type === 'root'){
      this.props.history.push('/businessadmin')
    }else{
      this.Auth.fetch(`${baseUrl}/api/cards/bizs/${this.props.user.payload.userid}`,{ 
        method: 'GET'}).then(response => {
          this.setState({ bizs: response });
        });
    }
    
  }

  render() {
    return(
      <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="business" role={this.props.user.payload.type}/>
        {this.state.bizs.map( biz => 
          <React.Fragment>
            <BusinessInfo {...biz} />
          </React.Fragment>
        )}

      </React.Fragment>
  );
  }
}

export default withAuth(Business);
