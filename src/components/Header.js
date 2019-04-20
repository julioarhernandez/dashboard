import React, { Component } from 'react';
import AuthService from './AuthService';

import logo from './images/logo-white.svg';
const Auth = new AuthService();

class Header extends Component {
    handleLogout = () => {
        Auth.logout()
        this.props.history.replace('/login');
     }
  
  render() {
    return (
      <div className={"header " + this.props.extraClass} >
        <div className="header-logo">
            <a href="https://dealby.us/" title="Go Home" alt="Go home">
                <img className="header-logo-image" src={logo} alt="DealBy logo - The best deals nearby" />
            </a>
        </div>
        <div className="header-links">
          <ul className="list -padding">
            <li className="list-item"><a href="#" onClick={this.handleLogout}><span className="material-icons">clear</span></a></li>
            <li className="list-item"><a href="#"><span className="material-icons">account_box</span></a></li>
            <li className="list-item"><a href="#"><span className="material-icons">store</span></a></li>
            <li className="list-item"><a href="#"><span className="material-icons">room</span></a></li>
            <li className="list-item"><a href="#"><span className="material-icons">arrow_back</span></a></li>
          </ul>      
        </div>
        
        { this.props.showBack && this.props.showBack.length && 
            <a href={"https://dealby.us/showvenue/" + this.props.showBack[0].veSlug } title="Go to deals list" alt="Go to deals list">
                <span className="hidden">Go Back</span>
                <span className="glyphicon glyphicon-arrow-left" aria-hidden="true">
            </span>
            </a>
        }
        { this.props.showHome && 
            <a href={"https://dealby.us/"} title="Start scanning" alt="Start Scanning"><span className="hidden">Go Back</span><span className="glyphicon glyphicon-home" aria-hidden="true"></span></a>
        }
        { this.props.showRefresh && 
            <a href={"https://dealby.us/"} title="Refresh Deals" alt="Refresh deals"><span className="hidden">Refresh</span><span className="glyphicon glyphicon-refresh" aria-hidden="true"></span></a>
        }
        { this.props.showMap && 
            <a href={"https://dealby.us/showmaps/"} title="Show nearby deals map" alt="Show nearby deals map"><span className="hidden">Map</span><span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span></a>
        }
      </div>
    );
  }
}
export default Header;

