import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext';

// const api = {
//     key:'2f3188fd357694b75e78bea214a87849',
//     base:'api.openweathermap.org/data/2.5/'
// }

const Home = () => {
    const {isAuthenticated} = useContext(AuthContext)
    const [weather, setWeather] = useState([])

    const getWeather = () => {
            fetch('http://api.openweathermap.org/data/2.5/weather?q=Sombor&appid=2f3188fd357694b75e78bea214a87849')
            .then(res => res.json())
            .then(result => {setWeather(result)})
    };
    useEffect(() => {
        getWeather()
        
    }, [])
   
    return (<div>
        {!isAuthenticated ?
        <div className='container mt-5'>
        <h1>You must</h1>
        <Link to="/login">
        <div className="btn btn-warning">Login</div>
        </Link>
          <h1>or</h1>
          <Link to="/register">
          <div className="btn btn-warning">Register</div>
          </Link>
            <h1>first</h1>
            </div> : 
            //weather api
            <div className='container mt-5'>
        <h1>Weather Forecast for {weather.name}, {weather.main ? weather.sys.country : 'undefined'}</h1>
        
        <h2>Temp: {weather.main ? (weather.main.temp-273.15) + '°C': 'undefined'}</h2>
        <p>{weather.main ? weather.weather[0].main : 'undefined'}</p>
        <p>Wind Speed: {weather.main ? weather.wind.speed : 'undefined'}</p>
        
          
            </div>

        }
        </div>
    )        
}

export default Home;