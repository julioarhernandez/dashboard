import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from "react-router-dom";
import imageSrc from "./images/emptyImage.png";
import bizBackground from "./images/bizbackground.jpg";
import Header from './Header';
import Mainlink from './Mainlink';
import baseUrl from "../helpers/urlHelpers";
import withAuth from './withAuth';
import AuthService from './AuthService';

class BusinessDetail extends Component {
    constructor(){
        super();
        this.id= '';
        this.bizId= '';
        this.state = {
            showAlerts: false,
            srcImage: '',
            title: '',
            description: '',
            image: ''
          };
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.preventSubmit = this.preventSubmit.bind(this);

    }
    preventSubmit(e){
        e.preventDefault();
    }
    handleChange(e){
        this.setState(
            {
                showAlerts: false,
                [e.target.name]: e.target.value
            }
        )
    }
    handleFileChange(e){
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                showAlerts: false,
                image: file,
                srcImage: reader.result
            });
        }

        reader.readAsDataURL(file)
    }
    handleFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('id', this.id);
        formData.append('bizId', this.bizId);
        formData.append('image', this.state.image);
        this.Auth.fetch('http://localhost:3001/api/cards/upload-logo/',{
            method: 'POST',
            mode: 'cors',
            body: formData
        }, false).then(response => {
            if (response.status === 'Success'){
                this.setState({ 
                    showAlerts: true,
                    message: 'Changes saved sucessfully!'
                });
            }else {
                this.setState({ 
                    showAlerts: true,
                    message: 'Error. Please try again!'
                });
            }
        });
    }
    

    componentDidMount () {
        this.id = this.props.match.params.id;
        this.bizId = this.props.bizId;
        this.Auth.fetch(`${baseUrl}/api/cards/getbizinfo/${this.id}`,{
            method: 'GET'
        }).then(response => {
            this.setState({ 
                name: response[0].bizName,
                image: response[0].bizLogo
            });
        });

    }
  render() {

    let {srcImage, image} = this.state;
    let $imagePreview = null;
    if (srcImage) {
      $imagePreview = (<img src={srcImage} alt="Business logo"/>);
    } else {
      $imagePreview = (<img src={image} alt="Business logo"/>);
    }

    return(
    <React.Fragment>
    <Header {...this.props}/>
    <Mainlink activeClass="business" role="{this.props.user.payload.type}"/>
      <div className="businessEdit">
        <div className="container -flex-wrap">
            <div className="businessEdit-item -border-blue-light">
                <form name="dealcard-form" onSubmit={this.preventSubmit} encType="multipart/form-data">
                    <div className="businessEdit-header">
                        <div className="businessEdit-image">
                            <figure>
                                {$imagePreview}
                            </figure>
                            <input type="file" name="image" id="image" onChange={this.handleFileChange}/>
                        </div>
                    </div>
                    <div className="businessEdit-body">
                        <div className="businessEdit-title">
                        <label htmlFor="title">Name</label>
                        <input type="text" name="title" id="title" onChange={this.handleChange} value={this.state.name}/>
                            {/* <h1>{this.state.title}</h1> */}
                        </div>
                        
                    </div>
                    <div className="businessEdit-aside">
                        <Link to="#" className="btn btn-blue -block" onClick={this.handleFormSubmit}>
                            Save Changes
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

export default BusinessDetail;
