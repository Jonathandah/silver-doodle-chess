let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

// Testing user endpoints
describe('User endpoints', () => {
  describe('/POST login', () => {
    it('it should return status 400 if password or username are incorrect', done => {
      chai
        .request(server)
        .post('/api/login')
        .send(JSON.stringify({ username: 'yaro', password: '123456' }))
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
