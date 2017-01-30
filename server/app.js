import app from './config/express';
import config from './config/env';
import logger from './config/logger';
// listen on port config.por
app.listen(config.port, () => {
  logger.info('server started at port [%s] with [%s] profile', config.port, config.env);
});

export default app;
