let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();
let fs = require('fs');

chai.use(chaiHttp);

// Testing user endpoints
describe('User endpoints', () => {
  beforeEach(() => {
    fs.writeFile('./databas/users.json', JSON.stringify({}), error => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('users.json is cleared');
    });
  });

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
    it('should return 400 if username is not atleast 4 characters or password is not atleast 6 characters', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({username: 'jo', password: '123'})
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.equal({message: 'Username must contain atleast 4 characters and password must have minimum 6 characters.'})
          done();
        })
    })
    // it('it should return status 400 if password or username are incorrect', done => {
    //   chai
    //     .request(server)
    //     .post('/api/login')
    //     .send({ username: 'yaro', password: '123456' })
    //     .end((err, res) => {
    //       res.should.have.status(400);
    //       res.body.should.be.a('object');
    //       done();
    //     });
    // });
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
