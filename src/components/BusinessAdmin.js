import React, { Component } from 'react';
// import axios from "axios";
import baseUrl from "../helpers/urlHelpers";
import Header from "./Header";
import Mainlink from "./Mainlink";
import BusinessInfo from "./BusinessInfo";
import VenueSelect from "./VenueSelect";

import AuthService from './AuthService';
import withAuth from './withAuth';

class BusinessAdmin extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      bizs: [],
      options: null, 
      selectedOption: null
    };
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  getVenues = () => {
    this.Auth.fetch(`${baseUrl}/api/cards/listvenues`,{ 
      method: 'GET'}).then(response => {
          this.setState({ data: response });
          let options = this.state.data && this.state.data.map((item) => ({ value: item.veSlug, label: `${item.veSlug} - ${item.veName}` }));
          this.setState({ options: options });
          console.log('options',this.state.options); 
      });
  }
  
  componentDidMount() {
    this.getVenues();
    // Redirect to admin route if admin
    // this.Auth.fetch(`${baseUrl}/api/cards/bizs/${this.props.user.payload.userid}`,{ 
    //   method: 'GET'}).then(response => {
    //     this.setState({ bizs: response });
    //   });
  }

  render() {
    return(
      <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="business" role={this.props.user.payload.type}/>
        <VenueSelect handleSelectChange={this.handleSelectChange} state={this.state}/>
        {/* {this.state.bizs.map( biz => 
          <React.Fragment>
            <BusinessInfo {...biz} />
          </React.Fragment>
        )} */}

      </React.Fragment>
  );
  }
}

export default withAuth(BusinessAdmin);
