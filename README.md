# sc-express-api

## Description

A sample project for REST API with mongoDB with basic CRUD 

following <a href="http://jsonapi.org/">jsonapi features</a>, <a href = "https://github.com/airbnb/javascript">airbnb js style</a>

 mongoose, redis-cache, helmet, swagger, babel, eslint, ES7, ..etc


## BEFORE RUN it

<a href = "https://www.mongodb.com"> MONGO</a> , <a href = "http://redis.io/">REDIS</a> are needed 

Currently using localhost with default port, u can config them in server/config/{env}.js

Also, a primary key counter recorded is needed in mongodb

> db.counters.insert({ "_id" : "user", "seq" : 1 })

## RUN ON TESTING ENV 

<a href = "http://pm2.keymetrics.io/">pm2</a> is strongly suggested to start the application 

##### install node_module

> yarn install

##### start the application with real time watch

>  NODE_ENV=dev pm2 start index.js --name scapi

## RUN ON PRODUCTION ENV 

##### install node_module

> yarn install --production

##### start the application

> NODE_ENV=prod pm2 start index.js

dev, uat, prod stands for different environment

## API DOC
Local Swagger Spec

http://localhost:3000/docs/

## Room for improvement




