import React, {Fragment, useContext} from 'react';
import {Link} from 'react-router-dom';
import Auth from '../endpoints/Auth';
import {AuthContext} from '../Context/AuthContext';


const Navbar = (props) => {
    const {setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

    const logoutHndler = () => {
        Auth.logout()
        .then(data => {
            if(data.success) {
                setUser(data.user);
                setIsAuthenticated(false)
            }
        })
    }

    const unauthNav = () => {
        return(
            <Fragment>
            <Link to="/">
            <li className='nav-item nav-link'>HomePage</li>
            </Link>
            <Link to="/login">
            <li className='nav-item nav-link'>Login</li>
            </Link>
            <Link to="/register">
            <li className='nav-item nav-link'>Register</li>
            </Link>
            </Fragment>
        )
    }

const authNav = () => {
    return(
        <Fragment>
            <Link to="/">
            <li className='nav-item nav-link'>HomePage</li>
            </Link>
           <button className='btn btn-link nav-item nav-link' type='button' onClick={logoutHndler}>Logout</button>
            </Fragment>

    )
}
    return(
       
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <Link to="/">
        <div className="navbar-brand">HyggeWeatherApp</div>
        </Link>
        
        <div className="container collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
        {!isAuthenticated ? unauthNav() : authNav()}                                                                      
          </ul>
        </div>
      </nav>
       
    )

}

export default Navbar;