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
    it('it should return status 400 if password or username are incorrect', done => {
      chai
        .request(server)
        .post('/api/login')
        .send({ username: 'yaro', password: '123456' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('/POST register', () => {
    it('Should return 201 if register is a success', done => {
      chai
        .request(server)
        .post('/api/register')
        .send({ username: 'Emma', password: '666666' })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('Should return 400 if the register did not work', done => {
      chai
        .request(server)
        .post('/api/register')
        .send({ username: 'Emma', password: '666' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
