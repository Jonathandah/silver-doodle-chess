let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let fs = require('fs');

const { expect } = chai;

chai.use(chaiHttp);

// Testing game endpoints
describe('Game endpoints', () => {
  let gameID;

  // remove all content from games.json before and after tests
  before(() => {
    fs.writeFile('./databas/games.json', JSON.stringify({}), error => {
      if (error) {
        console.log(error);
        return;
      }
    });
  });

  after(() => {
    fs.writeFile('./databas/games.json', JSON.stringify({}), error => {
      if (error) {
        console.log(error);
        return;
      }
    });
  });

  describe('POST /api/games', () => {
    let game;

    const testingErrors = done => {
      chai
        .request(server)
        .post('/api/games')
        .send(game)
        .end((err, res) => {
          if (err) {
            console.error('Could not make request', err);
            done(err);
          }

          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object').that.is.empty;
          expect(res.error.text).to.have.lengthOf.gt(0);

          done();
        });
    };

    // reset header, board, owner
    beforeEach(() => {
      game = {
        header: { White: 'player_1', Black: null, Date: '2019-??-??' },
        board: 'test',
        owner: 'Yaro'
      };
    });

    describe('this should return 400 if incorrect data from client', () => {
      describe('header', () => {
        it('missing', done => {
          delete game.header;

          testingErrors(done);
        });

        it('incorrect type', done => {
          game.header = 12345;

          testingErrors(done);
        });

        it('incorrect content', done => {
          game.header = { time: 12345 };

          testingErrors(done);
        });
      });

      describe('board', () => {
        it('missing', done => {
          delete game.board;

          testingErrors(done);
        });

        it('incorrect content', done => {
          game.board = 12345;

          testingErrors(done);
        });
      });

      describe('owner', () => {
        it('missing', done => {
          delete game.owner;

          testingErrors(done);
        });

        it('incorrect content', done => {
          game.owner = 12345;

          testingErrors(done);
        });
      });
    });

    it('this should return 201 if games was saved', done => {
      chai
        .request(server)
        .post('/api/games')
        .send(game)
        .end((err, res) => {
          if (err) {
            console.error('Could not make request', err);
            done(err);
          }

          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe('GET /api/games', () => {
    it('this should return all games', done => {
      chai
        .request(server)
        .get('/api/games')
        .end((err, res) => {
          if (err) {
            console.error('Could not make request', err);
            done(err);
          }

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          if (Object.keys(res.body).length) {
            for (const key in res.body) {
              gameID = key;

              expect(res.body[key]).to.include.all.keys([
                'header',
                'board',
                'owner'
              ]);
              expect(res.body[key].header)
                .to.be.an('object')
                .that.include.all.keys(['White', 'Black', 'Date']);
              expect(res.body[key].board).to.be.a('string');
              expect(res.body[key].owner).to.be.a('string');
            }
          }

          done();
        });
    });
  });

  describe('POST /api/games/:gameID/join', () => {
    describe('should return status 400', () => {
      it('missing username', done => {
        chai
          .request(server)
          .post(`/api/games/${gameID}/join`)
          .send({ player: 'yaro' })
          .end((err, res) => {
            if (err) {
              console.error('Could not make request', err);
              done(err);
            }

            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object').that.is.empty;
            expect(res.error.text).to.have.lengthOf.gt(0);

            done();
          });
      });

      it('username incorrect content', done => {
        chai
          .request(server)
          .post(`/api/games/${gameID}/join`)
          .send({ username: 1234 })
          .end((err, res) => {
            if (err) {
              console.error('Could not make request', err);
              done(err);
            }

            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object').that.is.empty;
            expect(res.error.text).to.have.lengthOf.gt(0);

            done();
          });
      });
    });

    it('should return 200 and a updated game', done => {
      chai
        .request(server)
        .post(`/api/games/${gameID}/join`)
        .send({ username: 'Emma' })
        .end((err, res) => {
          if (err) {
            console.error('Could not make request', err);
            done(err);
          }

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object').that.is.not.empty;

          for (const key in res.body) {
            expect(res.body[key])
              .to.be.an('object')
              .that.includes.all.keys(['header', 'board', 'owner']);
            expect(res.body[key].header)
              .to.be.an('object')
              .that.includes.all.keys(['White', 'Black', 'Date']);
            expect(res.body[key].board).to.be.a('string');
            expect(res.body[key].owner).to.be.a('string');
          }
          done();
        });
    });
  });

  describe('GET /api/games/:gameID', () => {
    it('this should return game for specific gameID', done => {
      chai
        .request(server)
        .get(`/api/games/${gameID}`)
        .end((err, res) => {
          if (err) {
            console.error('Could not make request', err);
            done(err);
          }

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object').that.is.not.empty;

          for (const key in res.body) {
            expect(res.body[key]).to.includes.all.keys([
              'header',
              'board',
              'owner'
            ]);
            expect(res.body[key].header)
              .to.be.an('object')
              .that.includes.all.keys(['White', 'Black', 'Date']);
            expect(res.body[key].board).to.be.a('string');
            expect(res.body[key].owner).to.be.a('string');
          }

          done();
        });
    });
  });

  describe('POST /api/games/:gameID/move', () => {
    describe('should return status 400', () => {
      it('missing board', done => {
        chai
          .request(server)
          .post(`/api/games/${gameID}/move`)
          .send({ board: null })
          .end((err, res) => {
            if (err) {
              console.error('Could not make request', err);
              done(err);
            }

            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object').that.is.empty;
            expect(res.error.text).to.have.lengthOf.gt(0);

            done();
          });
      });

      it('board incorrect content', done => {
        chai
          .request(server)
          .post(`/api/games/${gameID}/move`)
          .send({ board: 1234 })
          .end((err, res) => {
            if (err) {
              console.error('Could not make request', err);
              done(err);
            }

            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object').that.is.empty;
            expect(res.error.text).to.have.lengthOf.gt(0);

            done();
          });
      });
    });
  });

  describe('GET /api/games/my_games/:userName', () => {
    it('this should return all games for specific user', done => {
      chai
        .request(server)
        .get('/api/games/my_games/Emma')
        .end((err, res) => {
          if (err) {
            console.error('Could not make request', err);
            done(err);
          }

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object').that.is.not.empty;

          for (const key in res.body) {
            expect(res.body[key]).to.includes.all.keys([
              'header',
              'board',
              'owner'
            ]);
            expect(res.body[key].header)
              .to.be.an('object')
              .that.includes.all.keys(['White', 'Black', 'Date']);
            expect(res.body[key].board).to.be.a('string');
            expect(res.body[key].owner).to.be.a('string');
          }

          done();
        });
    });

    it('this should return empty object', done => {
      chai
        .request(server)
        .get('/api/games/my_games/Yaro')
        .end((err, res) => {
          if (err) {
            console.error('Could not make request', err);
            done(err);
          }

          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object').that.is.empty;

          done();
        });
    });
  });
});
