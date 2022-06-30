import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import Joi from 'joi-browser';
import Form from './Form';
import { login } from '../../services/authService';
import { withRouter } from './withRouter';

class LoginForm extends Form {

    constructor(){
        super();
        this.state = {
            data : { email: '' , password : ''},
            errors : { }
        }
    }

    schema = {
        email : Joi.string().email().required(),
        password : Joi.string().min(5).max(12).required()
    }


    
    doSubmit = async () => {
        //connect to the backend
        console.log("form submitted");
        console.log(this.state.data);
        const { email,password } = this.state.data;
        const {data : token } = await login(email,password)
        localStorage.setItem('token',token)
        //redirect to homepage
        //this.props.navigate('/movies') -> this will only navigate to the url
        
        window.location = '/movies'
       
    }
   


   

    
    render() {
        const { data,errors } = this.state;
        return (
            <div>
            <form onSubmit={this.handleSubmit}>

            { 
            this.renderInput('Email', 'email', data.email,errors.email,'email') 
            }
            
            {
                this.renderInput('Password','password',data.password,errors.password,'password')
            }
            
            
           { this.renderButton('Login') }
            </form>
        
        </div>
        );
    }
}

export default withRouter(LoginForm);