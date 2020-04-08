import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  
  return (
     <BrowserRouter>
     <Navbar />
     <Route exact path="/" component={Home} />
     <Route path="/login" component={Login} />
     <Route path="/register" component={Register} />
     </BrowserRouter>
  );
}

export default App;
