import React, { Component } from 'react';
import { Link } from "react-router-dom";
import imageSrc from "./images/emptyImage.png";

class DealsCards extends Component {
  render() {
    return(
      <div className="DealsCards">
        <div className="container -flex-wrap">
            <div className="DealsCards-item -border-blue-light">
                <div className="DealsCards-header">
                    <div className="DealsCards-image">
                        <figure>
                            <img src={imageSrc} alt=""/>
                        </figure>
                    </div>
                </div>
                <div className="DealsCards-body">
                    <div className="DealsCards-title">
                        <h1>Title of the deal you are displaying in the real cards</h1>
                    </div>
                    <div className="DealsCards-description">
                        <h2>Description of the deal you are displaying in the real cards wityh ellipsis at the end</h2>
                    </div>
                </div>
                <div className="DealsCards-aside">
                    <Link to="/deal/12313123123" className="btn btn-blue -block">
                        Edit Deal
                    </Link>
                </div>
            </div>
            <div className="DealsCards-item -border-blue-light">
                <div className="DealsCards-header">
                    <div className="DealsCards-image">
                        <figure>
                            <img src={imageSrc} alt=""/>
                        </figure>
                    </div>
                </div>
                <div className="DealsCards-body">
                    <div className="DealsCards-title">
                        <h1>Title of the deal you are displaying in the real cards</h1>
                    </div>
                    <div className="DealsCards-description">
                        <h2>Description of the deal you are displaying in the real cards wityh ellipsis at the end</h2>
                    </div>
                </div>
                <div className="DealsCards-aside">
                    <Link to="/deal/12313123123" className="btn btn-blue -block">
                        Edit Deal
                    </Link>
                </div>
            </div>
            <div className="DealsCards-item -border-blue-light">
                <div className="DealsCards-header">
                    <div className="DealsCards-image">
                        <figure>
                            <img src={imageSrc} alt=""/>
                        </figure>
                    </div>
                </div>
                <div className="DealsCards-body">
                    <div className="DealsCards-title">
                        <h1>Title of the deal you are displaying in the real cards</h1>
                    </div>
                    <div className="DealsCards-description">
                        <h2>Description of the deal you are displaying in the real cards wityh ellipsis at the end</h2>
                    </div>
                </div>
                <div className="DealsCards-aside">
                    <Link to="/deal/12313123123" className="btn btn-blue -block">
                        Edit Deal
                    </Link>
                </div>
            </div>
        </div>
      </div>
  );
  }
}

export default DealsCards;
