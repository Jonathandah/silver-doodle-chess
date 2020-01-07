import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Board from './views/game/Board';
import './App.sass';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/game" component={Board} />
      </div>
    </Router>
  );
}

export default App;
