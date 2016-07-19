import supertest from 'supertest';
import should from 'should';
// This agent refers to PORT where program is runninng.
const server = supertest.agent('http://localhost:3000');

// UNIT test begin
describe('SAMPLE test 1 : GET /v1/users', () => {
  it('should get users list even it is empty', (done) => {
    server
    .get('/v1/users')
    .expect('Content-type', /json/)
    .expect(200) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.meta.code.should.equal(200);
      done();
    });
  });

  it('should get validation error when page is not an integer', (done) => {
    server
    .get('/v1/users?page=xxx')
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should get validation error when count is not an integer', (done) => {
    server
    .get('/v1/users?count=xxx')
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });
});

describe('SAMPLE test 2 : POST /v1/users', () => {
  it('should create a new user record', (done) => {
    server
    .post('/v1/users')
    .send({ userName: 'mocha', email: 'mocha@gmail.com', mobile: '12345678' })
    .expect('Content-type', /json/)
    .expect(200) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(200);
      res.body.meta.code.should.equal(200);
      done();
    });
  });

  it('should have validation error when userName is invalid', (done) => {
    server
    .post('/v1/users')
    .send({ userName: 'm', email: 'mocha@gmail.com', mobile: '12345678' })
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should have validation error when email is invalid (no @) ', (done) => {
    server
    .post('/v1/users')
    .send({ userName: 'mocha', email: 'mochagmail.com', mobile: '12345678' })
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });


  it('should have validation error when mobile length is too short', (done) => {
    server
    .post('/v1/users')
    .send({ userName: 'mocha', email: 'mocha@gmail.com', mobile: '78' })
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should have validation error when mobile length is too long', (done) => {
    server
    .post('/v1/users')
    .send({ userName: 'mocha', email: 'mocha@gmail.com', mobile: '222222222222222222' })
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should have validation error when mobile is alpha', (done) => {
    server
    .post('/v1/users')
    .send({ userName: 'mocha', email: 'mocha@gmail.com', mobile: 'aaaaaaaa' })
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should have validation error when empty json is sent', (done) => {
    server
    .post('/v1/users')
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should have validation error when only uesrName is sent', (done) => {
    server
    .post('/v1/users')
    .send({ userName: 'mocha' })
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should have validation error when only email is sent', (done) => {
    server
    .post('/v1/users')
    .send({ email: 'mocha@email.com' })
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should have validation error when only mobile is sent', (done) => {
    server
    .post('/v1/users')
    .send({ mobile: '66666666' })
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });
});

describe('SAMPLE test 3 : DEL /v1/users/{id}', () => {
  it('create a new user record then delete it', (done) => {
    server
    .post('/v1/users')
    .send({ userName: 'mocha', email: 'mocha@gmail.com', mobile: '12345678' })
    .expect('Content-type', /json/)
    .expect(200) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(200);
      server.del(`/v1/users/${res.body.data.user.userId}`)
        .expect('Content-type', /json/)
        .expect(200) // THis is HTTP response
        .end((err2, res2) => {
          res2.status.should.equal(200);
          res2.body.meta.code.should.equal(200);
          done();
        });
    });
  });

  it('should have unfound error when id [0] is sent', (done) => {
    server
    .del('/v1/users/0')
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should have validation error when id [aa] is sent', (done) => {
    server
    .del('/v1/users/aaa')
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });
});

describe('SAMPLE test 4 : GET /v1/users/{id}', () => {
  it('create a new user record then GET it', (done) => {
    server
    .post('/v1/users')
    .send({ userName: 'mocha', email: 'mocha@gmail.com', mobile: '12345678' })
    .expect('Content-type', /json/)
    .expect(200) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(200);
      server.get(`/v1/users/${res.body.data.user.userId}`)
        .expect('Content-type', /json/)
        .expect(200) // THis is HTTP response
        .end((err2, res2) => {
          res2.status.should.equal(200);
          res2.body.meta.code.should.equal(200);
          done();
        });
    });
  });

  it('should have unfound error when id [0] is sent', (done) => {
    server
    .get('/v1/users/0')
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it('should have validation error when id [aaa] is sent', (done) => {
    server
    .get('/v1/users/aaa')
    .expect('Content-type', /json/)
    .expect(400) // THis is HTTP response
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });
});
