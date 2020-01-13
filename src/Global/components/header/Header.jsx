import React, { useState } from 'react';
import { updateUser } from '../../store/userStore';
import { Link } from 'react-router-dom';
import PopUp from '../popUp/PopUp';
import './Header.sass';

function Header() {
  const [showPopUp, updateShowPopUp] = useState(false);

  return (
    <>
      <header className="Header">
        <nav className="Header__nav">
          <button
            className="Header__nav__button--createGame"
            onClick={() => updateShowPopUp(true)}
          >
            Create Game
            <i className="fas fa-chess-rook nav__icon"></i>
          </button>
          <Link className="Header__nav__link--allGames" to="/">
            <button 
              className="Header__nav__button--allGames"
            >
              All Games
              <i className="fas fa-chess nav__icon"></i>
            </button>
          </Link>
          <Link className="Header__nav__link--myGames" to="/my_games">
            <button 
              className="Header__nav__button--myGames"
            >
              My Games
              <i className="fas fa-chess-bishop nav__icon"></i>
            </button>
          </Link>
          <button
            className="Header__nav__button--logOut"
            onClick={() => updateUser()}
          >
            Log out
          </button>
        </nav>
      </header>

      {showPopUp ? <PopUp updateShowPopUp={updateShowPopUp} /> : null}
    </>
  );
}

export default Header;
