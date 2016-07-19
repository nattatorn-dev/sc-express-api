import Promise from 'bluebird';
import redisCache from 'express-redis-cache';
import config from './env';
import logger from './logger';

const client = Promise.promisifyAll(redisCache(config.redis));

client.on('connected', () => {
  logger.info('[REDIS] connected');
});

client.on('error', (error) => {
  logger.error('[REDIS] fail to connect: %s', JSON.stringify(error));
});

client.on('message', (message) => {
  logger.info('[REDIS] %s', JSON.stringify(message));
});

export default client;
