import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import AuthService from './AuthService';
import baseUrl from '../helpers/urlHelpers';

class VenueSelect extends React.Component {

    render(){
        const { selectedOption, options } = this.props.state;   
        return (
            <div className="container -flex-wrap">
                <div className="VenueSelect">
                    <label>Venue</label>
                    {options && 
                        <Select value={selectedOption} onChange={this.props.handleSelectChange} options={options}/>
                    }
                </div>
            </div>
          );
    }
    
}
export default VenueSelect;

