import Axios from 'axios'
import config from '../config.json'

const apiEndPoint =  config.apiUrl +'/genres'

export function getGenres() {
    return Axios.get(apiEndPoint); 
}