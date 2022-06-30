import React, { Component } from 'react';
import Form from './common/Form';
import Joi  from 'joi-browser';
import { withRouter } from './common/withRouter';

import { getGenres } from '../services/genreService';
import { getMovie } from '../services/movieService';

class MovieForm extends Form {
    constructor(){
        super();
        this.state = {
            data :{
                title : '' ,
                genreId : '' , 
                numberInStock : '' , 
                dailyRentalRate : ''
            }
            ,
            errors : {},
            genres : []

            
        }
    }
    async componentDidMount() {
        try{
            const { data :genres } =  await getGenres();
            this.setState({ genres })
        }catch(ex){
            console.log('something went wrong')
        }
        //console.log(this.props.location)
        const movieId = this.props.params.id

        if(movieId === 'new' ){
            return;
        }
        //make a backend call to find movie by id
        const {data : movie } = await getMovie(movieId);
        //console.log(movie);
        this.setState({
            data :{
                _id : movie._id ,
                title : movie.title,
                genreId : movie.genre._id,
                numberInStock : movie.numberInStock,
                dailyRentalRate : movie.dailyRentalRate

            } 
            })
    }
    schema = { 
        title : Joi.string().required() ,
        genreId : Joi.string().required() ,
        numberInStock : Joi.number().required() , 
        dailyRentalRate : Joi.number().required() 
    }

    doSubmit = () => {
        //connecting to backend and making a push/put request to the api 
        console.log('form submitted',this.state.data)
    }

    render() {
        const { data ,errors} = this.state ; 
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                { 
                    this.renderInput('Title', 'title', data.title,errors.title) 
                } 
                <div className='mb-3'>
                    <label htmlFor = 'genreId' className='form-label'>
                        Select Genre
                    </label>
                <select onChange={this.handleChange} className = 'form-control' name= 'genreId' >
                    <option value="">Select Genre</option>
                        {
                        this.state.genres.map( g => (
                            <option key = {g._id} value={g._id}> {g.name}</option>
                        ))
                    }
                </select>
                </div>

                { 
                    this.renderInput('Rate', 'dailyRentalRate', data.dailyRentalRate,errors.dailyRentalRate) 
                } 

                { 
                    this.renderInput('Stock', 'numberInStock', data.numberInStock,errors.numberInStock) 
                } 

                {
                    this.renderButton('Save')
                }                      
                    
                </form>
            </div>
        );
    }
}

export default withRouter(MovieForm);