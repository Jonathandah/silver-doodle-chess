const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const STORAGE_USERS = './databas/users.json';
const STORAGE_GAMES = './databas/games.json';

app.use(cors());
app.use(express.json());

/************** REGISTER **************/
app.post('/api/register', function(req, res) {
  if (!req.body.username && !req.body.password) {
    res.status(400).end();
    return;
  }

  if (req.body.username.length < 4 || req.body.password.length < 6) {
    res
      .status(400)
      .send(
        'Username must contain atleast 4 characters and password must have minimum 6 characters.'
      );
    return;
  }

  fs.readFile(STORAGE_USERS, function(error, data) {
    if (error) {
      res.status(500).send('Server Error: Could not create new user');
      return;
    }

    let users = JSON.parse(data);

    for (let user in users) {
      if (users[user].username === req.body.username) {
        res.status(400).send('A user with this name already exists');
        return;
      }
    }

    fs.writeFile(
      STORAGE_USERS,
      JSON.stringify({ ...users, [+new Date()]: req.body }),
      function(error) {
        if (error) {
          res.status(500).send('Server Error: Could not create new user');
          return;
        }

        res.status(201).end();
      }
    );
  });
});

/************** LOGIN **************/
app.post('/api/login', function(req, res) {
  if (!req.body.username && !req.body.password) {
    res.status(400).end();
    return;
  }

  if (req.body.username.length < 4 || req.body.password.length < 6) {
    res
      .status(400)
      .send(
        'Username must contain atleast 4 characters and password must have minimum 6 characters.'
      );
    return;
  }

  fs.readFile(STORAGE_USERS, function(error, data) {
    if (error) {
      res.status(500).end();
      return;
    }

    try {
      let users = JSON.parse(data);

      for (let user in users) {
        if (JSON.stringify(users[user]) === JSON.stringify(req.body)) {
          res.status(200).send({ [user]: users[user] });
          return;
        }
      }
    } catch (error) {
      console.error('app.js - could not parse JSON', error);
      res.status(500).send('SERVER ERROR: Could not parse JSON');
      return;
    }

    res.status(400).send('Username or password is incorrect.');
  });
});

/************** GET ALL GAMES **************/
app.get('/api/games', function(req, res) {
  fs.readFile(STORAGE_GAMES, function(error, formatedData) {
    if (error) {
      res.status(500).send('SERVER ERROR: Could not load games');
      return;
    }

    try {
      let data = JSON.parse(formatedData);
      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('SERVER ERROR: Could not parse games');
    }
  });
});

/************** ADD A NEW GAME **************/
app.post('/api/games', function(req, res) {
  let data = req.body;

  // checking header
  if (!data.header) {
    res.status(400).send('Missing header.');
    return;
  }

  if (typeof data.header !== 'object') {
    res.status(400).send('Header should be an object.');
    return;
  }

  if (
    !data.header.hasOwnProperty('White') ||
    !data.header.hasOwnProperty('Black') ||
    !data.header.hasOwnProperty('Date')
  ) {
    res
      .status(400)
      .send(
        'Header should contain the following keys: "White", "Black", "Date"'
      );
    return;
  }

  // checking board
  if (!data.board) {
    res.status(400).send('Missing board.');
    return;
  }

  if (typeof data.board !== 'string') {
    res.status(400).send('Board should be a string.');
    return;
  }

  // checking owner
  if (!data.owner) {
    res.status(400).send('Missing owner.');
    return;
  }

  if (typeof data.owner !== 'string') {
    res.status(400).send('Owner should be a string.');
    return;
  }

  fs.readFile(STORAGE_GAMES, function(error, formatedData) {
    if (error) {
      res.status(500).send('Server Error: Could not create new game');
      return;
    }

    try {
      let games = JSON.parse(formatedData);

      fs.writeFile(
        STORAGE_GAMES,
        JSON.stringify({ ...games, [+new Date()]: data }),
        function(error) {
          if (error) {
            res.status(500).send('Server Error: Could not create new game');
            return;
          }

          res.status(201).end();
        }
      );
    } catch (error) {
      console.error('app.js - could not parse JSON', error);
      res.status(500).send('SERVER ERROR: Could not parse JSON');
    }
  });
});

/************** ACCEPT/START A GAME **************/

app.post('/api/game/:id', function(req, res) {});

/************** GET A SPECIFIC GAME **************/

app.get('/api/game/:id', function(req, res) {});

/************** MAKE A MOVE IN A GAME **************/

app.post('/api/game/move', function(req, res) {});

http.listen(8000, function() {
  console.log('Listening on *:8000');
});

module.exports = http;
