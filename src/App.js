import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Navbar from './navbar/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TaskDisplay from './pages/TaskDisplay';
import PrivateRoute from './components/PrivateRoute';
import ProfileSetting from './pages/ProfileSetting';
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
  }

  return (
    <div>
      <Router>
      <Navbar user={user} DelUserFromLocalStorage={DelUserFromLocalStorage}/>
        <Switch>
          <Route exact path="/">{user ?  <Redirect to="/taskDisplay"/> : <Home/>}</Route>
          <Route path="/signup">{user ?  <Redirect to="/taskDisplay"/> : <Signup addUserToLocalStorage={addUserToLocalStorage}/>}</Route>
          <Route path="/login">{user ?  <Redirect to="/taskDisplay"/> : <Login addUserToLocalStorage={addUserToLocalStorage}/>}</Route>
          <PrivateRoute path="/taskDisplay" user={user} DelUserFromLocalStorage={DelUserFromLocalStorage} component={TaskDisplay}/>
          <Route  path="/setting">
            {user ?  <ProfileSetting user={user} DelUserFromLocalStorage={DelUserFromLocalStorage} addUserToLocalStorage={addUserToLocalStorage}/>: <Redirect to="/login"/> }
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
