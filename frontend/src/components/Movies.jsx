import React, { Component } from 'react';

import Pagination from './common/Pagination';
import { paginate } from './../utils/paginate';
import ListGroup from './common/ListGroup';
import { toast } from 'react-toastify';
import { deleteMovie, getMovies } from './../services/movieService';
import { getGenres } from '../services/genreService';
import { genres } from './../services/fakeGenreService';
import { withRouter } from './common/withRouter';
import { Navigate, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


class Movies extends Component {
    constructor(){
        super();
        this.state = {
            movies : [],
            pageSize :4,
            currentPage :1,
            genres : [],
            selectedGenre : null
        }
    }
    async componentDidMount(){

        
        //here http calls to backend are made
        //way 1 : 
        //without using async and await
        // getMovies().
        // then((response) => {
        //     // console.log("recieved data from the backend")
        //     // console.log(response.data)
        //     const movies = response.data;
        //     this.setState({movies})
        // }).catch((error)=>{
        //     console.log("something went wrong")
        // })
        //way 2 : using async and await
        try{
        const { data : movies } = await getMovies();
        const { data } = await getGenres();
        const genres = [{name : "all genres"},...data]
        this.setState({movies,genres})
        }catch(exception){
            console.log('something went wrong',exception)
        }
        
    //     const genres = [{name:'All Genres'}, ...getGenres()];
    //     this.setState({movies,genres});
    }
    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;
        const movies = this.state.movies.filter( m => m._id != movie._id)
        this.setState({movies})
        try{
        const {data } = await deleteMovie(movie._id)
        }catch(ex){
            if(ex.response && ex.response.status === 404){
            toast.error('Movie has already been deleted')
            }
            this.setState({movies : originalMovies})
        }
    }
    handleAddMovie = () => {
        this.props.navigate('/movies/new')
    }
    handlePageChange = (pageNo) => {
        this.setState({currentPage:pageNo})
    }
    handleGenreSelect = (genre) => {
        this.setState({selectedGenre :genre,currentPage :1})
    }
    render() {
        const { movies:allmovies,currentPage,pageSize ,genres,selectedGenre} = this.state;
        const {length :count } = allmovies
        
        if(count === 0) 
        return <p>There are no movies in the database </p>

        const filteredMovies = selectedGenre && selectedGenre._id
                ? allmovies.filter( m => m.genre._id === selectedGenre._id)
                : allmovies;
        const paginatedMovies = paginate(filteredMovies,currentPage,pageSize)
        return (
            <div className='row'>
                <div className="className col-3">
                    <ListGroup 
                    items = {genres}
                    selectedItem = {selectedGenre}
                    onItemSelect = {this.handleGenreSelect}
                    
                    />
                </div>
                <div className="className col-9">
                <div>
                <h1>Movies </h1>
                
                <p>Showing {filteredMovies.length} movies from the database</p>

                <button onClick={this.handleAddMovie } className="btn btn-primary">
                    
                        Add Movie</button>
                        

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{
                        paginatedMovies.map(movie => 
                            <tr key={movie._id}>
                            <td><NavLink to= { `/movies/${movie._id}` }>{movie.title}</NavLink></td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><button className="btn btn-danger btn-sm" onClick={()=> this.handleDelete(movie)}>Remove</button></td>
                        </tr>
                        )}
                        
                    </tbody>
                </table>    <div className='col-12'>
          <Pagination
               
              pageSize = {pageSize}
              itemsCount = {filteredMovies.length}
              currentPage = {currentPage}
              onPageChange = {this.handlePageChange}
          />
        </div>
            </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Movies);