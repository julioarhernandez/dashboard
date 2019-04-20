import React, { Component } from 'react';
import axios from "axios";
import baseUrl from "../helpers/urlHelpers";
import Header from "./Header";
import Mainlink from "./Mainlink";
import BusinessInfo from "./BusinessInfo";
// import './App.css';

// import AuthService from './components/AuthService';
import withAuth from './withAuth';
// const Auth = new AuthService();

class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bizs: []
    };
  }
  
  componentDidMount() {
    axios.get( `${baseUrl}/api/cards/bizs/${this.props.user.payload.userid}`)
      .then(res => {
        this.setState({ bizs: res.data });
      });
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
