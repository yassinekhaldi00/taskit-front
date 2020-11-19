import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './navbar/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TaskDisplay from './pages/TaskDisplay';
import PrivateRoute from './components/PrivateRoute';
import LoginRoute from './components/LoginRoute';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(localStorage.getItem('user'));

  function addUserToLocalStorage(user){
    localStorage.setItem('user',JSON.stringify(user));
    setUser(localStorage.getItem('user'));
  }

  function DelUserFromLocalStorage(){
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    setUser(localStorage.getItem('user'));
    console.log(user);
  }

  return (
    <div>
      <Router>
      <Navbar user={user} DelUserFromLocalStorage={DelUserFromLocalStorage}/>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <LoginRoute path="/signup" user={user} addUserToLocalStorage={addUserToLocalStorage} component={Signup}/>
          <LoginRoute path="/login" user={user} addUserToLocalStorage={addUserToLocalStorage} component={Login}/>
          <PrivateRoute path="/taskDisplay" user={user} component={TaskDisplay}/>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
