import React, {useState, useContext} from 'react';
import Auth from '../endpoints/Auth';
import {AuthContext} from '../Context/AuthContext';
import Message from '../components/Message';

const Login = (props) => {
    const [user, setUser] = useState({username:'', password:''});
    const authContext = useContext(AuthContext);
    const [message, setMessage] = useState(null);

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const formSubmit = (e) => {
        e.preventDefault();
        Auth.login(user).then(data => {
            const {isAuthenticated, user, message} = data;
            if(isAuthenticated) {
                authContext.setUser(user)
                authContext.setIsAuthenticated(isAuthenticated)
                props.history.push('/')
            }else{
                setMessage(message)
            }
        })
    }


    return (
        <div>
            <form onSubmit={formSubmit}>
            <h3 className='mt-5 mb-3 ml-2'>Sign In to proceed to the Hygge Weather App</h3>
            <div className='container mt-5 mb-3 ml-2'>
            <label htmlFor='username' className='sr-only'>Username:</label>
            <input type='text' name='username' placeholder='Enter Username' className='form-control' onChange={onChangeHandler} minLength={6} maxLength={100}/>
            <label htmlFor='password' className='sr-only'>Password:</label>
            <input type='password' name='password' placeholder='Enter Password' className='form-control' onChange={onChangeHandler} minLength={6} maxLength={100} />
            <button className='btn btn-large btn-warning' type='submit'>Login</button>
            </div>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    )
}

export default Login