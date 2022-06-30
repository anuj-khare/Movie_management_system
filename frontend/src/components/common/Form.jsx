import React, { Component } from 'react';
import  Joi  from 'joi-browser';
import Button from './Button';
import Input from './Input';

class Form extends Component {

    constructor(){
        super();
        this.state = {
            data : {},
            errors : { }
        }
    }

    handleChange = ({target : input}) => {
        //console.log(event);
        const data = {...this.state.data}
        const errors = {...this.state.errors}
        data[input.name] = input.value;
        
        const errorMessage = this.validateField(input)

        if(errorMessage){
            errors[input.name] = errorMessage
        }
        else {
            delete errors[input.name]
        }
        this.setState({ data ,errors});
    }

    validateField = (input) => {
        
        const data = { [input.name]  : input.value}
        const schema = { [input.name] : this.schema[input.name]}
        //schema mei abort Early isiliye nhi kia kyuki uska koi mtlb nhi nikalta hai 
        const results = Joi.validate(data,schema);

        if(!results.error) return null;

        
        return results.error.details[0].message;
        
        // if(input.name === 'email'){
        //     if(input.value === ''){
        //         return 'email is required'
        //     }
        // }
        // if(input.name === 'password'){
        //     if(input.value === ''){
        //         return 'password is required'
        //     }
        // }
    }

    
    validate = () => {

        let errors = {};
        const { data } = this.state;

        const results = Joi.validate( data , this.schema ,{abortEarly : false});
        console.log(results);

        if(!results.error) {
            return null;
        }

        for(let item of results.error.details){
            errors[item.path[0]] = item.message 
        }

        return errors;
        // //checks fields and return errors object containing appropriate fields.
        // let errors = {}
        // const {data} = this.state;

        // if(data.email === ''){
        //     errors.email = 'Email is required';
        // }
        // if(data.password === ''){
        //     errors.password = 'Password is required';
        // }
        // return Object.keys(errors).length === 0 ? null : errors ;
    }

    renderInput = (label,name,value,error,type= 'text') => {
        return <Input
            label = {label}
            name = {name}
            value = {value}
            type = {type}
            error = {error}
            onChange = {this.handleChange}
            
            />
    }

    renderButton = (label) => {
        return <Button
        label = {label} 
        />
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //console.log(event);
    
    //Validating the data entered is correct
    const errors = this.validate();
    this.setState({errors : errors || {} })
    if(errors){
        return;
    }

    //connect to the backend
    this.doSubmit();
        // console.log();
        // console.log();
    }



    render() {
        return (
            null
        );
    }
}

export default Form;