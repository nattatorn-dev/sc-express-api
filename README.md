# sc-express-api-es7

## Description

A sample project for REST API with mongoDB with basic CRUD 

following <a href="http://jsonapi.org/">jsonapi features</a>, <a href = "https://github.com/airbnb/javascript">airbnb js style</a>

logging, profile, cache, helmet, swagger, babel, eslint, ES7

## BEFORE RUN it

<a href = "https://www.mongodb.com"> MONGO</a> , <a href = "http://redis.io/">REDIS</a> are needed 

Currently using localhost with default port, u can config them in server/config/{env}.js

Also, a primary key counter recorded is needed in mongodb

> db.counters.insert({ "_id" : "user", "seq" : 1 })

## RUN ON TESTING ENV 

<a href = "http://pm2.keymetrics.io/">pm2</a> is strongly suggested to start the application 

##### install node_module

> npm install

##### run unit test

> npm test

##### start the application with real time watch

>  NODE_ENV=dev pm2 start index.js --watch --ignore-watch "node_modules"

## RUN ON PRODUCTION ENV 

##### install node_module

> npm install --production

##### start the application

> NODE_ENV=prod pm2 start index.js

dev, uat, prod stands for different environment

## API DOC
Local

http://localhost:3000/docs/

Online demo on AWS

http://ec2-52-196-132-150.ap-northeast-1.compute.amazonaws.com/docs/

## Room for improvement

1) All use arrow function

2) swagger set body request for POST and PUT


