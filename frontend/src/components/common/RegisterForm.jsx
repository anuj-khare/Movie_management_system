import React, { Component } from 'react';
import Form from './Form';
import  Joi  from 'joi-browser';
import { register } from '../../services/userService';
import { withRouter } from './withRouter';

class RegisterForm extends Form{ 

    constructor(){
        super();
        this.state = {
            data : { email: '' , password : '', name :'' },
            errors : { }
        }
    }

    schema = {
        email : Joi.string().email().required(),
        password : Joi.string().min(5).max(12).required(),
        name : Joi.string().required(),
    }

     doSubmit = async () => {
        //we want to make a post request to the backend 
        // to register end user.
        try{
            const response = await register(this.state.data);
            //console.log('registration succesfull',response)
            localStorage.setItem('token',response.headers['x-auth-token'])
            //redirect to homepage
            this.props.navigate('/movies')
            
        }
        catch(ex ){
            if(ex.response && ex.response.status === 400 ){
                //alert("something went wrong")
                const errors = { ...this.state.errors }
                errors.email = ex.response.data
                this.setState({errors})
            }
        }

    }

    render () {
        const { data,errors } = this.state;
        return (
            <div>
                <h1 >Registration Form</h1>
            <form onSubmit={this.handleSubmit}>

            { 
            this.renderInput('Email', 'email', data.email,errors.email,'email') 
            }
            
            {
                this.renderInput('Password','password',data.password,errors.password,'password')
            }
            
            {
                this.renderInput('Name','name',data.name,errors.name)
            }
            
           { this.renderButton('Register') }
            </form>
        
        </div>
        );
    }
}

export default withRouter(RegisterForm)