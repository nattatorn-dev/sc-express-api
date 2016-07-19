import winston from 'winston';
import config from './env';
import _ from 'lodash';
import DailyRotate from 'winston-daily-rotate-file';

const { method, level, filePath } = config.logger;

winston.emitErrs = true;

let transports = [];

const commonConfig = {
  handleExceptions: true,
  json: false,
  colorize: true,
  timestamp: true,
  level,
};

const fileConfig = {
  filename: filePath,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
};

if (method === 'file') {
  _.assign(commonConfig, fileConfig);
  transports = [new DailyRotate(commonConfig)];
} else {
  transports = [new winston.transports.Console(commonConfig)];
}

const logger = new winston.Logger({
  exitOnError: false,
  transports,
});

export default logger;
