const chai = require('chai');
const http = require('chai-http');
const app = require('../app.js');
const userCredentials = require('../src/config/test.config');

const { expect } = chai;

chai.use(http);

describe('Protected routes', () => {
  it('should return public page', (done) => {
    chai
      .request(app)
      .get('/api/test/all')
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      }).catch((err) => {
        console.log(err.message);
      });
  });
  it('should return error if no valid token provided', (done) => {
    chai
      .request(app)
      .get('/api/test/user')
      .then((res) => {
        expect(res).to.have.status(403);
        done();
      }).catch((err) => {
        console.log(err.message);
      });
  });
  it('should not load user page when invalid credentials are provided', (done) => {
    const user = {
      email: userCredentials.email,
      password: 'fake-password',
    };
    chai
      .request(app)
      .post('/api/auth/signin')
      .send(user)
      .then((loginResponse) => {
        const token = loginResponse.body.accessToken;
        chai.request(app).get('/api/test/user')
          .set('x-access-token', token)
          .then((protectedResponse) => {
            expect(protectedResponse).to.have.status(401);
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });

      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  it('should load user page when valid credentials are provided', (done) => {
    const user = {
      email: userCredentials.email,
      password: userCredentials.password,
    };
    chai
      .request(app)
      .post('/api/auth/signin')
      .send(user)
      .then((loginResponse) => {
        const token = loginResponse.body.accessToken;
        chai.request(app).get('/api/test/user')
          .set('x-access-token', token)
          .then((protectedResponse) => {
            expect(protectedResponse).to.have.status(200);
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });

      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  it('should not load moderator page when provided user credentials', (done) => {
    const user = {
      email: userCredentials.email,
      password: userCredentials.password,
    };
    chai
      .request(app)
      .post('/api/auth/signin')
      .send(user)
      .then((loginResponse) => {
        const token = loginResponse.body.accessToken;
        chai.request(app).get('/api/test/mod')
          .set('x-access-token', token)
          .then((protectedResponse) => {
            expect(protectedResponse).to.have.status(403);
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });
          
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  after((done) => { // eslint-disable-line no-undef
    process.exit();
    done();
  });
});
