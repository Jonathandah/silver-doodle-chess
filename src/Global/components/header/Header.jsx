import React, { useEffect, useState } from 'react';
import { user$, updateUser } from '../../store/userStore';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header() {
  const [logout, updateLogout] = useState(false);

  if (logout) {
    updateUser();
    return <Redirect to="/login" />;
  } else if (!user$.value) {
    return <Redirect to="/login" />;
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <button className="header__nav__button--createGame">Create Game</button>
        <button className="header__nav__button--logOut">Log out</button>
        <Link className="header__nav__link--allGames" to="/">
          All Games
        </Link>
        <Link className="header__nav__link--myGames" to="/my_games">
          My Games
        </Link>
      </nav>
    </header>
  );
}

export default Header;
