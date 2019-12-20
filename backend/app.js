const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const users = require('./databas/users.json');

app.use(cors());
app.use(express.json());
const STORAGE_USERS = './databas/users.json';

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

    let users = JSON.parse(data);

    for (let user in users) {
      if (JSON.stringify(users[user]) === JSON.stringify(req.body)) {
        res.status(200).send({ [user]: users[user] });
        return;
      }
    }

    res.status(400).send('Username or password is incorrect.');
  });
});

/************** GET ALL GAMES **************/

app.get('/api/games', function(req, res) {});

/************** ADD A NEW GAME **************/

app.post('/api/games', function(req, res) {});

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
