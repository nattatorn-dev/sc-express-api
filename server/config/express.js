import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import routes from '../routes';
import expressValidation from 'express-validation';
import swaggerTools from 'swagger-tools';
import helmet from 'helmet';

import NotFound from '../helpers/NotFound';
import Response from '../helpers/Response';
import payload from '../utils/payload';
import swagger from './swagger';
import logger from './logger';
import telegram from './telegram';
import config from './env';
import mongoose from './mongoose';

const app = express();

// parse body params and attache them to req.body
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(cors());

// mount all routes on /v1 path
app.use('/v1', routes);

// swagger related
app.get('/api-docs', (req, res) => {
  res.json(swagger);
});

swaggerTools.initializeMiddleware(swagger, (middleware) => {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter({
    controllers: './server/routes',
    useStubs: false,
  }));
  app.use(middleware.swaggerUi());
});

// payload handler
app.use((obj, req, res, next) => {
  const logId = Math.floor((Math.random() * 10000) + 1);
  logger.info('[%s] ,%s, URL:%s, PATH:%s', logId, req.method, req.url, req.path);
  logger.info('[%s] , QUERY:%s, BODY:%s', logId, JSON.stringify(req.query),
  JSON.stringify(req.body));
  if (obj instanceof Response) {
    logger.info('[%s] , CALLBACK:%s', logId, JSON.stringify(obj.data));
    return res.status(200).json(payload.normal(obj.data)).end();
  } else if (obj instanceof expressValidation.ValidationError) {
    logger.warn('[%s] , INVALID PARAM:%s', logId, JSON.stringify(obj.errors));
    return res.status(400).json(payload.invalidParam(obj.errors)).end();
  } else if (obj instanceof NotFound) {
    logger.warn('[%s] , NOTFOUND', logId);
    return res.status(404).json(payload.noRecord()).end();
  }
  // system error when obj is unfound
  const objStr = JSON.stringify(obj);
  logger.error('[%s] ,SYSTEM ERROR:%s', logId, objStr);
  telegram.sendMessage(config.telegram.chatId, `SYSTEM ERROR logId: ${logId}, error: ${objStr}`);
  return res.status(500).json(payload.systemError(obj)).end();
});

export default app;
