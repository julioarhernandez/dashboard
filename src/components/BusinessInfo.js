import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackImage from './images/bizbackground.jpg';

class BusinessInfo extends Component {
    // constructor(props) {
    //     super(props);
    //     
    //     console.log( `${bizName}`);
    //   }
    
  render() {
    const { _id, bizName, bizLogo, veName, bizAddress} = this.props;
    return(
      <div className="businessInfo">
        <div className="container">
            <div className="businessInfo-item -border-blue-light">
                <div className="businessInfo-header">
                    <img className="businessInfo-logo" src={this.props.bizLogo} alt={bizName} />

                </div>
                <div className="businessInfo-body">
                    <h1>{this.props.bizName}</h1>
                    <div className="businessInfo-venue">
                        {veName}
                    </div>
                    <div className="businessInfo-address">
                        {/* {Object.values(bizAddress).join('')} */}
                        {bizAddress.street}<br/>
                        {bizAddress.county}, {bizAddress.state}. {bizAddress.zip}
                        
                    </div>
                    <Link to={"/getcards/" + _id} className="btn btn-blue -block">Show Cards</Link>
                </div>
            </div>
        </div>
      </div>
  );
  }
}

export default BusinessInfo;
