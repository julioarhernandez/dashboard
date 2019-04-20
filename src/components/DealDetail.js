import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from "react-router-dom";
import imageSrc from "./images/emptyImage.png";
import bizBackground from "./images/bizbackground.jpg";
import baseUrl from "../helpers/urlHelpers";
import withAuth from './withAuth';
import AuthService from './AuthService';

class DealDetail extends Component {
    constructor(){
        super();
        this.cardId= '';
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
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('cardId', this.cardId);
        formData.append('bizId', this.bizId);
        formData.append('image', this.state.image);
        this.Auth.fetch('http://localhost:3001/api/cards/upload/',{
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
        this.cardId = this.props.cardId;
        this.bizId = this.props.bizId;
        this.Auth.fetch(`${baseUrl}/api/cards/getcard/${this.cardId}`,{
            method: 'GET'
        }).then(response => {
            this.setState({ 
                title: response[0].cards.cardTitle,  
                description: response[0].cards.cardContent,  
                image: response[0].cards.cardImgSrc
            });
        });

    }
  render() {

    let {srcImage, image} = this.state;
    let $imagePreview = null;
    if (srcImage) {
      $imagePreview = (<img src={srcImage} alt="Deal"/>);
    } else {
      $imagePreview = (<img src={image} alt="Deal"/>);
    }

    return(
      <div className="DealsCards">
        <div className="container -flex-wrap">
            <div className="DealsCards-item -border-blue-light">
                <form name="dealcard-form" onSubmit={this.preventSubmit} encType="multipart/form-data">
                    <div className="DealsCards-header">
                        <div className="DealsCards-image">
                            <figure>
                                {$imagePreview}
                            </figure>
                            <input type="file" name="image" id="image" onChange={this.handleFileChange}/>
                        </div>
                    </div>
                    <div className="DealsCards-body">
                        <div className="DealsCards-title">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" onChange={this.handleChange} value={this.state.title}/>
                            {/* <h1>{this.state.title}</h1> */}
                        </div>
                        <div className="DealsCards-description">
                        <label htmlFor="description">Deal description</label>
                        <textarea rows="4" value={this.state.description} name="description" id="description" onChange={this.handleChange} className="p_wrap"/>
                        </div>
                    </div>
                    <div className="DealsCards-aside">
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
  );
  }
}

export default DealDetail;
