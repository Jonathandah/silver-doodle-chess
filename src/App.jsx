import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './views/home/Home';
import MyGames from './views/home/MyGames';
import Login from './views/login/Login';
import Register from './views/register/Register';
import GameBoard from './views/game/GameBoard';
import Header from './global/components/header/Header';
import './App.sass';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/my_games" component={MyGames} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/game/:id" component={GameBoard} />
      </div>
    </Router>
  );
}

export default App;
