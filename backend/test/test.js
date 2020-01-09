let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();
let fs = require('fs');

chai.use(chaiHttp);

// Testing user endpoints
describe('User endpoints', () => {
  beforeEach(() => {
    fs.writeFile('./databas/users.json', JSON.stringify({"1578259123833":{"username":"joanna","password":"123456"}}), error => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('users.json is cleared');
    });
  });

/************** LOGIN TEST **************/
  describe('/POST login', () => {
    it('should return 400 if username or password are empty', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          done();
        })
    });
    it('should return 400 if username is not atleast 4 characters', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({username: 'jo', password: '123456'})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.deep.equal({message: 'Username must contain atleast 4 characters and password must have minimum 6 characters.'});
          done();
        })
    });
    it('should return 400 if password is not atleast 6 characters', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({username: 'joanna', password: '123'})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.deep.equal({message: 'Username must contain atleast 4 characters and password must have minimum 6 characters.'});
          done();
        })
    });
    it('should return 200 and the user info if a user exists', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({username: 'joanna', password: '123456'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.deep.equal({"1578259123833":{username: 'joanna', password: '123456'}});
          done();
        })
    });
    it('should return 400 if credentials are wrong', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({username: 'kalle', password: '123456'})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.deep.equal({message: 'Username or password is incorrect.'});
          done();
        })
    });
  });

  //   REGISTER TEST
  describe('/POST register', () => {
    it('Should return 201 if register is a success', done => {
      chai
        .request(server)
        .post('/api/register')
        .send({ username: 'Emma', password: '000000' })
        .end((err, res) => {
          if (err) {
            console.error('Could not make request', err);
            done(err);
          }

          res.should.have.status(201);
          done();
        });
    });
    it('Should return 400 if the register did not work', done => {
      chai
        .request(server)
        .post('/api/register')
        .send({ username: 'Emma', password: '000' })
        .end((err, res) => {
          if (err) {
            console.error('Could not make request', err);
            done(err);
          }

          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
