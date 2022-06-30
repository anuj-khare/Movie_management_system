import axios from 'axios'

import config from '../config.json'

const apiEndPoint = config.apiUrl + '/users' 

export function register(user) {
    return axios.post(apiEndPoint, user); // this returns a promise
}