import supertest from 'supertest';
import should from 'should';

// This agent refers to PORT where program is runninng.

let server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE test 1 : GET /v1/users",function(){

  it("should get users list even it is empty",function(done){
    server
    .get("/v1/users")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.meta.code.should.equal(200);
      done();
    });
  });

  it("should get validation error when page is not an integer",function(done){
    server
    .get("/v1/users?page=xxx")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should get validation error when count is not an integer",function(done){
    server
    .get("/v1/users?count=xxx")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });
});

describe("SAMPLE test 2 : POST /v1/users",function(){

  it("should create a new user record",function(done){
    server
    .post("/v1/users?userName=mocha&email=mocha@gmail.com&mobile=12345678")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.meta.code.should.equal(200);
      done();
    });
  });
  
  it("should have validation error when userName is invalid",function(done){
    server
    .post("/v1/users?userName=m&email=mocha@gmail.com&mobile=12345678")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

   it("should have validation error when userName is invalid",function(done){
    server
    .post("/v1/users?userName=m&email=mocha@gmail.com&mobile=12345678")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should have validation error when email is invalid (no @) ",function(done){
    server
    .post("/v1/users?userName=mocha&email=mochagmail.com&mobile=12345678")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });


  it("should have validation error when mobile length is too short",function(done){
    server
    .post("/v1/users?userName=mocha&email=mocha@gmail.com&mobile=78")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should have validation error when mobile length is too long",function(done){
    server
    .post("/v1/users?userName=mocha&email=mocha@gmail.com&mobile=2222222222222222222222222222")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should have validation error when mobile is alpha",function(done){
    server
    .post("/v1/users?userName=mocha&email=mocha@gmail.com&mobile=aaaaa")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should have validation error when empty json is sent",function(done){
    server
    .post("/v1/users")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should have validation error when only uesrName is sent",function(done){
    server
    .post("/v1/users?userName=mocha")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should have validation error when only email is sent",function(done){
    server
    .post("/v1/users?email=mocha@email.com")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should have validation error when only mobile is sent",function(done){
    server
    .post("/v1/users?mobile=66666666")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

});


describe("SAMPLE test 3 : DEL /v1/users/{id}",function(){
  it("create a new user record then delete it",function(done){
    server
    .post("/v1/users?userName=mocha&email=mocha@gmail.com&mobile=12345678")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);

       server.del("/v1/users/" + res.body.data.user.userId)
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.meta.code.should.equal(200);
          done();
        });
      });
    });

  it("should have unfound error when id [0] is sent",function(done){
    server
    .del("/v1/users/0")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should have validation error when id [aa] is sent",function(done){
    server
    .del("/v1/users/aaa")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

});

describe("SAMPLE test 4 : GET /v1/users/{id}",function(){
  it("create a new user record then GET it",function(done){
    server
    .post("/v1/users?userName=mocha&email=mocha@gmail.com&mobile=12345678")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);

       server.get("/v1/users/" + res.body.data.user.userId)
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.meta.code.should.equal(200);
          done();
        });
      });
    });

  it("should have unfound error when id [0] is sent",function(done){
    server
    .get("/v1/users/0")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

  it("should have validation error when id [aaa] is sent",function(done){
    server
    .get("/v1/users/aaa")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(400);
      res.body.meta.code.should.equal(4001);
      done();
    });
  });

});

