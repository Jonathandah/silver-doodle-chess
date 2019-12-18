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
    res.status(400).send('Username must contain atleast 4 characters and password must have minimum 6 characters.');
    return;
  }   

    fs.readFile(STORAGE_USERS, function(error, data) {
      if(error) {
        res.status(500).send('Server Error: Could not create new user')
        return;
      }

      let users = JSON.parse(data);
      
      for (let user in users) {
        if (users[user].username === req.body.username) {
          res.status(400).send('A user with this name already exists');
          return;
        }
      }

      fs.writeFile(STORAGE_USERS, JSON.stringify({...users, [+new Date()]: req.body}), function(error) {
          console.log(JSON.stringify({...users, [new Date()]: req.body}));
          res.status(201).end();
        });
    });
  }
);


/************** LOGIN **************/

app.post('/api/login', function(req, res) {
  console.log(req.body);

  if (!req.body.username && !req.body.password) {
    res.status(400).end();
    return;
  }
  
  if (req.body.username.length < 4 || req.body.password.length < 6) {
    res.status(400).send('Username must contain atleast 4 characters and password must have minimum 6 characters.');
    return;
  } 

  fs.readFile(STORAGE_USERS, function(error, data) {
    if(error) {
      res.status(500).end();
      return;
    }

    let users = JSON.parse(data);

    for (let user in users) {
      if (JSON.stringify(users[user]) === JSON.stringify(req.body)) {
        res.status(200).send({[user]: users[user]})
        return;
      }
    }

    res.status(400).send("Cannot find any user with this combination of username and password.");
  });

});











http.listen(8000, function() {  
  console.log('Listening on *:8000');
});