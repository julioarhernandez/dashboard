import React, { Component } from 'react';
import axios from "axios";
import baseUrl from "../helpers/urlHelpers";
import Header from "./Header";
import Mainlink from "./Mainlink";
import CardInfo from "./CardInfo";
// import './App.css';

// import AuthService from './components/AuthService';
import withAuth from './withAuth';
// const Auth = new AuthService();

class CardsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }
  
  componentDidMount() {
    axios.get( `${baseUrl}/api/cards/getbizcards/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ 
          cards: res.data
        });
      });
  }

  render() {
    return(
      <React.Fragment>
        <Header {...this.props}/>
        <Mainlink activeClass="deals" role={this.props.user.payload.type}/>
        {this.state.cards[0] && this.state.cards[0].cards.map( card => 
          <React.Fragment>
            <CardInfo cards={card} id={this.state.cards[0]._id}/>
          </React.Fragment>
        )}
      </React.Fragment>
  );
  }
}

export default withAuth(CardsInfo);
