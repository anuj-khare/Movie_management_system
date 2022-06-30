import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { withRouter } from './common/withRouter';

function Logout(props) {
    
    useEffect( () =>{
        localStorage.removeItem('token');
        window.location ='/'
    })
    return null;
}



export default withRouter(Logout);