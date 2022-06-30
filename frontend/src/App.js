import './App.css';
import LoginForm from './components/common/LoginForm';
import RegisterForm from './components/common/RegisterForm';
import { ToastContainer } from 'react-toastify';
import Movies from './components/Movies';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/common/Navbar';
import MovieForm from './components/MovieForm';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Logout from './components/Logout';
import ComponentA from './components/common/ComponentA';
import ComponentB from './components/ComponentB';
function App() {

  const [ user,setUser ] = useState(null)

  useEffect( () => {
    try{
        const token = localStorage.getItem('token')
        const user = jwtDecode(token)
        setUser(user)
    }
    catch(ex){

    }
  },[])

  return (
    
    <div className='container'>
      <ToastContainer />
      
      <div className='row'>
        <div className='col-12'>
          <Navbar user={user}/>
        </div>
      </div>

      <div className='row'>
        
        <div className='col-12'>
        

          {/* <ComponentA />
          <ComponentB /> */}
          
           <Routes>
          <Route path = '/movies/:id' element = { <MovieForm/> } />
          <Route path = '/register' element = { <RegisterForm/> } />
          <Route path = '/login' element = { <LoginForm/> } />
          <Route path = '/' element = { <Home/> } />
          <Route path = '/movies' element = { <Movies/> } />
          <Route path = '/logout' element = { <Logout/> } />
          </Routes> 
        </div>
        
        </div>
    

    </div>
  );
}

export default App;
