import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './navbar/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import TaskDisplay from './pages/TaskDisplay';

function App() {
  return (
    <div>
      <Router>
      <Navbar/>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route path="/signup"><Signup/></Route>
          <Route path="/login"><Login/></Route>
          <Route path="/taskDisplay"><TaskDisplay/></Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
