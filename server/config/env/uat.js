const config = {
  env: 'uat',
  mongo: {
    url: 'mongodb://localhost:27017/sc-express-db',
  },
  redis: {
    host: 'localhost',
    port: 6379,
    expire: {
      200: 5000,
      304: 5000,
      xxx: 1,
    },
    prefix: 'uat_sc_express_api',
  },
  port: 3000,
  logger: {
    method: 'console',
    level: 'info',
    filePath: '',
  },
};

export default config;
