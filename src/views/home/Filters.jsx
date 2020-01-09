import React from 'react';

const Filters = ({ games, updateGames }) => {
  return (
    <nav className="Home__container__nav">
      <button
        className="Home__container__nav__tab"
        onClick={e => {
          updateGames({ ...games, filter: 'My Games' });
        }}
      >
        My Games
      </button>
      <button
        className="Home__container__nav__tab"
        onClick={e => {
          updateGames({ ...games, filter: 'All Games' });
        }}
      >
        All Games
      </button>
    </nav>
  );
};

export default Filters;
