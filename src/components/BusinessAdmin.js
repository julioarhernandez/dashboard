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
    // console.log(`Option selected:`, selectedOption);
  }

  getVenues = () => {
    this.Auth.fetch(`${baseUrl}/api/cards/listvenues`,{ 
      method: 'GET'}).then(response => {
          this.setState({ data: response });
          let options = this.state.data && this.state.data.map((item) => ({ value: item.veSlug, label: `${item.veSlug} - ${item.veName}` }));
          this.setState({ options: options });
          // console.log('options',this.state.options); 
      });
  }

  getBizs = (venueSlug) => {
    this.Auth.fetch(`${baseUrl}/api/cards/venues/${venueSlug}`,{ 
      method: 'GET'}).then(response => {
        this.setState({ bizs: response });
      });

  }

  componentWillUpdate = (nextProps, nextState) => {
    // just do this when the selected options is not null 
    // and it's not the same value as in the previous state
    if (nextState.selectedOption && 
        nextState.selectedOption.value && 
        this.state.selectedOption &&
        this.state.selectedOption.value !== nextState.selectedOption.value){
      this.getBizs(nextState.selectedOption.value);
    } 
  }
  
  componentDidMount() {
    this.getVenues();    
  }

  render() {
    return(
      <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="business" role={this.props.user.payload.type}/>
        <VenueSelect handleSelectChange={this.handleSelectChange} state={this.state}/>
        {this.state.bizs.map( biz => 
          <React.Fragment>
            <BusinessInfo {...biz} />
          </React.Fragment>
        )}

      </React.Fragment>
  );
  }
}

export default withAuth(BusinessAdmin);
