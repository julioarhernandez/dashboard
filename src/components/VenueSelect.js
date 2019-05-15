import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import AuthService from './AuthService';
import baseUrl from '../helpers/urlHelpers';

class VenueSelect extends React.Component {

    // handleChange = (selectedOption) => {
    //     this.setState({ selectedOption });
    //     console.log(`Option selected:`, selectedOption);
    // }
    componentDidMount(){
        // this.Auth.fetch(`${baseUrl}/api/cards/listvenues`,{ 
        //     method: 'GET'}).then(response => {
        //         this.setState({ data: response });
        //         let options = this.state.data && this.state.data.map((item) => ({ value: item.veSlug, label: `${item.veSlug} - ${item.veName}` }));
        //         this.setState({ options: options });
        //         console.log('options',this.state.options); 
        //     });
    }
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

