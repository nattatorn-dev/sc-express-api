import Promise from 'bluebird';
import redisCache from 'express-redis-cache';
import config from './env';
import logger from './logger';

const client = Promise.promisifyAll(redisCache(config.redis));

client.on('connected', () => {
  logger.info('[CACHE] CONNECTED');
});

client.on('error', (error) => {
  logger.error('[CACHE] %s', JSON.stringify(error));
});

client.on('message', (message) => {
  logger.info('[CACHE] %s', JSON.stringify(message));
});

export default client;
