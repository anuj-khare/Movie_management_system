import axios from 'axios';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/auth'

export function login(email,password){
    return axios.post(apiEndPoint, {email,password})
}