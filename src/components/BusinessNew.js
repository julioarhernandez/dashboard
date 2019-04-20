import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from "react-router-dom";
import baseUrl from "../helpers/urlHelpers";
import AuthService from './AuthService';
import Header from './Header';
import Mainlink from './Mainlink';


import withAuth from './withAuth';

class BusinessNew extends Component {
    constructor(){
        super();
    
        this.state = {
            showAlerts: false,
            message: '',
            email: '',
            password: ''
          };
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
        this.checkVenueExistence = this.checkVenueExistence.bind(this);

    }
    preventSubmit(e){
        e.preventDefault();
    }
    checkVenueExistence(e){
        e.preventDefault();
        // Get the parent venue of this location
        if (this.state.bizLocation){
            let [ lat, long] = this.state.bizLocation.split(',');
            this.Auth.fetch(`${baseUrl}/api/cards/getparentvenue/${lat}/${long}`,{ 
                method: 'GET'}).then(response => {
                    if (response[0]){
                        // reverse coordinates from long, lat to lat, long
                        let [long, lat] = response[0].vePointLocation.coordinates;
                        this.setState({ 
                            bizVenueSlug: response[0].veSlug,
                            bizVenueName: response[0].veName,
                            bizVenueLocation: `${lat},${long}`,
                            showAlerts: true,
                            message: 'There is a Venue here, check the Venue fields are fill!'
                        });
                    }else {
                        this.setState({ 
                            showAlerts: true,
                            message: 'There is no venue here. Create one before proceed!'
                        });
                    }
                });
        }
    }
    validateInputs(){
        // return  this.state.name && 
        //         this.state.slug && 
        //         this.state.polygonLocation &&
        //         this.state.pointLocation &&
        //         this.state.addressStreet &&
        //         this.state.addressZip
        return true;
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
        if (this.validateInputs()){
            this.Auth.fetch(`${baseUrl}/api/cards/addbiz/`,{
                method: 'POST',
                body: JSON.stringify({
                    bizName: this.state.bizName,
                    bizWeb: this.state.bizWeb,
                    bizPhone: this.state.bizPhone,
                    bizLogo: this.state.bizLogo,
                    bizCountry: this.state.addressCountry,
                    bizState: this.state.addressState,
                    bizStreet: this.state.addressStreet,
                    bizZip: this.state.addressZip,
                    bizLocation: this.state.bizLocation,
                    bizCounty: this.state.addressCounty,
                    bizVenueName: this.state.bizVenueName,
                    bizVenueSlug: this.state.bizVenueSlug,
                    bizVenueLocation: this.state.bizVenueLocation,
                    bizCardAmount: this.state.bizCardAmount
                })
            }).then(response => {
                if (response.status === 'Success'){
                    this.setState({ 
                        showAlerts: true,
                        message: 'Changes saved sucessfully!'
                    });
                }else {
                    console.log(response);
                    this.setState({ 
                        showAlerts: true,
                        message: 'Error. Please try again!'
                    });
                }
            });
        }else{
            this.setState({ 
                showAlerts: true,
                message: 'Fill required inputs'
            })
        }
    }

  render() {

    return(
        <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="venue" role="{this.props.user.payload.type}"/>
        <div className="BusinessCardNew">
            <div className="container -flex-wrap">
                <div className="BusinessCardNew-item">
                    <form onSubmit={this.preventSubmit}>
                        <div className="BusinessCardNew-body">
                            <div className="BusinessCardNew-name">
                                <label htmlFor="bizName">Name</label>
                                <input type="text" name="bizName" id="bizName" onChange={this.handleChange} value={this.state.bizName}/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizWeb">Website</label>
                                <input type="text" name="bizWeb" id="bizWeb" onChange={this.handleChange} value={this.state.bizWeb}/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizPhone">Phone</label>
                                <input type="text" name="bizPhone" id="bizPhone" onChange={this.handleChange} value={this.state.bizPhone}/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizLogo">Logo</label>
                                <input type="text" name="bizLogo" id="bizLogo" onChange={this.handleChange} value={this.state.bizLogo}/>
                            </div>
                            <div className="BusinessCardNew-pointLocation">
                                <label htmlFor="bizLocation">Biz Point Location</label>
                                <input type="text" name="bizLocation" id="bizLocation" onChange={this.handleChange} value={this.state.bizLocation} placeholder="lat,long"/>
                                <a href="#" alt="Check if there is a venue here" title="Check if there is a venue here" onClick={this.checkVenueExistence}>Is here a venue?</a>
                            </div>
                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressStreet">Street</label>
                                <input type="text" name="addressStreet" id="addressStreet" onChange={this.handleChange} value={this.state.addressStreet} />
                            </div>
                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressZip">Zip</label>
                                <input type="text" name="addressZip" id="addressZip" onChange={this.handleChange} value={this.state.addressZip} />
                            </div>
                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressCity">City</label>
                                <input type="text" name="addressCity" id="addressCity" onChange={this.handleChange} value={this.state.addressCity} placeholder="Default:Miami"/>
                            </div>
                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressState">State</label>
                                <input type="text" name="addressState" id="addressState" onChange={this.handleChange} value={this.state.addressState} placeholder="Default:FL"/>
                            </div>
                            <div className="BusinessCardNew-address">
                                <label htmlFor="addressCountry">Country</label>
                                <input type="text" name="addressCountry" id="addressCountry" onChange={this.handleChange} value={this.state.addressCountry} placeholder="Default:US"/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizVenueName">Venue Name</label>
                                <input type="text" name="bizVenueName" id="bizVenueName" onChange={this.handleChange} value={this.state.bizVenueName}/>
                            </div>
                            <div className="BusinessCardNew-slug">
                                <label htmlFor="bizVenueSlug">Venue Slug</label>
                                <input type="text" name="bizVenueSlug" id="bizVenueSlug" onChange={this.handleChange} value={this.state.bizVenueSlug}/>
                            </div>
                            <div className="BusinessCardNew-pointLocation">
                                <label htmlFor="bizVenueLocation">Venue Point Location</label>
                                <input type="text" name="bizVenueLocation" id="bizVenueLocation" onChange={this.handleChange} value={this.state.bizVenueLocation} placeholder="lat,long"/>
                            </div>
                            
                        </div>
                        <div className="BusinessCardNew-aside">
                            <Link to="#" className="btn btn-blue -block" onClick={this.handleFormSubmit}>
                                Create Venue
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

export default withAuth(BusinessNew);

