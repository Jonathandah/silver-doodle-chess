import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { user$ } from './global/store/userStore';
import Home from './views/home/Home';
import MyGames from './views/home/MyGames';
import Login from './views/login/Login';
import Register from './views/register/Register';
import GameBoard from './views/game/GameBoard';
import Header from './global/components/header/Header';
import './App.sass';

function App() {
  const [loggedIn, updateLoggedIn] = useState(user$.value);

  useEffect(() => {
    const sub = user$.subscribe(updated => updateLoggedIn(updated));

    return () => sub.unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {loggedIn ? <Header /> : null}
        {!loggedIn ? <Redirect to="/login" /> : null}
        <Route exact path="/" component={Home} />
        <Route path="/my_games" component={MyGames} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/game/:gameId" component={GameBoard} />
      </div>
    </Router>
  );
}

export default App;
