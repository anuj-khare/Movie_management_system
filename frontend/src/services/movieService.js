import Axios from 'axios'
import config from '../config.json'

const apiEndPoint = config.apiUrl + '/movies'

export function getMovies(){
    return Axios.get(apiEndPoint) //constructs a http get request, return type is a promise
}

export function deleteMovie(movieId){
    return Axios.delete(apiEndPoint+'/'+movieId)
}

// export function save(movie){

// }

export function getMovie(movieId){
    return Axios.get(apiEndPoint+'/'+ movieId)
}