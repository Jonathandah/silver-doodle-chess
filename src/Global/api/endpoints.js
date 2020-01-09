let call = {
  REGISTER: () => {
    //post
    return '/api/register';
  },
  LOGIN: () => {
    //post
    return '/api/login';
  },
  GET_SPECIFIC_GAME: id => {
    //get
    return `/api/games/${id}`;
  },
  JOIN_GAME: id => {
    //get
    return `/api/games/${id}/join`;
  },
  ALL_GAMES: () => {
    //get
    return '/api/games/';
  },
  ADD_NEW_GAME: () => {
    //post
    return '/api/games/';
  },

  USER_GAMES: username => {
    //get
    // username is the logged in users, username
    return `/api/games/my_games/${username}`;
  },

  MOVE: id => {
    //post
    //id is game id
    return `/api/games/${id}/move`;
  }
};

export default call;
