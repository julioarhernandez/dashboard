import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Mainlink = (props) => {
    let activeClass = '-active';
    return (
      <div className="mainlink" >
        <div className="mainlink-list">
            <ul className="list">
                <li className={`list-item ${props.activeClass === 'business' ? activeClass :'' }`}>
                    <Link to="/business">
                        <div className="material-icons">store</div>
                        <div>Business</div>
                    </Link>
                </li>
                <li className={`list-item ${props.activeClass === 'deals' ? activeClass :'' }`}>
                    <Link to="/">
                        <div className="material-icons">local_offer</div>
                        <div>Deals</div>
                    </Link>
                </li>
                <li className={`list-item ${props.activeClass === 'account' ? activeClass :'' }`}>
                    <Link to="/account">
                        <div className="material-icons">account_circle</div>
                        <div>Account</div>
                    </Link>
                </li>
                <li className={`list-item ${props.activeClass === 'users' ? activeClass :'' }`}>
                    <Link to="/users">
                        <div className="material-icons">account_circle</div>
                        <div>Users</div>
                    </Link>
                </li>
                {props.role === 'root' && 
                <li className={`list-item ${props.activeClass === 'venues' ? activeClass :'' }`}>
                    <Link to="/venues">
                        <div className="material-icons">pin_drop</div>
                        <div>venues</div>
                    </Link>
                </li>
                }
            </ul>
        </div>
      </div>
    );
}
export default Mainlink;

