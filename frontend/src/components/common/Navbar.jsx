import React from 'react';
import { NavLink } from 'react-router-dom';
function Navbar({user}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className='container-fluid'>
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto m-2 mb-lg-0 ">
      <li className="nav-item">
        <NavLink className="nav-link active" to="/">Home </NavLink>
      </li>
      {user &&
        <React.Fragment>
        <li className="nav-item">
              <NavLink className="nav-link" to="/movies">Movies</NavLink>
        </li>
        
        <li className="nav-item">
              <NavLink className="nav-link" to="/profile">{user.name}</NavLink>
        </li>

        <li className="nav-item">
              <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li>
        
        </React.Fragment>
      }
      {!user && 

          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
          </React.Fragment>
      }
      
    </ul>
    
  </div>
  </div>
</nav>
    );
}

export default Navbar;