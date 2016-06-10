import Promise from 'bluebird';
import redisCache from 'express-redis-cache';
import config from './env';
import logger from './logger';

let client = redisCache(config.redis);
client =  Promise.promisifyAll(client);

client.on('connected', function () {
 	logger.info("[CACHE] CONNECTED")
});

client.on('error', function (error) {
	logger.error('[CACHE] %s',JSON.stringify(error));
});

client.on('message', function (message) {
	logger.info("[CACHE] %s",JSON.stringify(message));
});
export default client;