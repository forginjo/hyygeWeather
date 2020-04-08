import React, {createContext, useState, useEffect} from 'react'
import Auth from '../endpoints/Auth'

//Context make global state accessable, children points on App

export const AuthContext = createContext();

// this is AuthProvider function to wrap index.js
export default ({children}) => {
    //something like initial global state
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        Auth.isAuthenticated().then(data => {
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated)
            setIsLoading(true)
        })
    }, [])

return(
    // going to wrap app and pass value like global state
    <div>
        {!isLoading ?
             <h1>Loading...</h1>
              : 
              <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
              {children}
              </AuthContext.Provider>}
    </div>
)
}