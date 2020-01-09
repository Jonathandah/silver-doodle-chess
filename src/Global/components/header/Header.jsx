import React, { useState } from 'react';
import { updateUser } from '../../store/userStore';
import { Link } from 'react-router-dom';
import PopUp from '../popUp/PopUp';
import './Header.sass';

function Header() {
  const [showPopUp, updateShowPopUp] = useState({ join: false, create: false });

  return (
    <>
      <header className="Header">
        <nav className="Header__nav">
          <button
            className="Header__nav__button--createGame"
            onClick={() => updateShowPopUp({ ...showPopUp, create: true })}
          >
            Create Game
          </button>
          <Link className="Header__nav__link--allGames" to="/">
            <button className="Header__nav__button--allGames">All Games</button>
          </Link>
          <Link className="Header__nav__link--myGames" to="/my_games">
            <button className="Header__nav__button--myGames">My Games</button>
          </Link>
          <button
            className="Header__nav__button--logOut"
            onClick={() => updateUser()}
          >
            Log out
          </button>
        </nav>
      </header>

      {showPopUp.create ? (
        <PopUp info={showPopUp} updateShowPopUp={updateShowPopUp} />
      ) : null}
    </>
  );
}

export default Header;
