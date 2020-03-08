import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword'
import Navbar from './components/navbar'
import Books from './pages/Books'
import Book from './pages/Book'
import User from './pages/User'


function App() {
  return (
    <>
    <Navbar />
    <Router >
      <Switch>

        <Route path="/" exact>
          <Homepage />
        </Route>

        <Route path="/login" exact >
          <Login />
        </Route>

        <Route path="/signup" exact>
          <Signup />
        </Route>

        <Route path="/forgotpassword" exact>
          <ForgotPassword />
        </Route>

        <Route path="/books" exact>
          <Books />
        </Route>
        <Route path="/books/:_id">
          <Book />
        </Route>

        <Route path="/user/:_id">
          <User />
        </Route>

        <Redirect to="/" />        
      </Switch>  
    </Router>
    </>
  );
  
}

export default App;
