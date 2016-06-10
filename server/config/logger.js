import winston from 'winston';
import config from './env';
import _ from 'lodash';

const method = config.logger.method;
const level = config.logger.level;
const filePath = config.logger.filePath;

winston.emitErrs = true;

let transports = [];

const commonConfig = {
    level: level,
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp : true
};

const fileConfig = {
    filename: filePath,
    maxsize: 5242880, //5MB
    maxFiles: 5
}

if(method === "file"){
    _.assign(commonConfig, fileConfig);
	transports = [new winston.transports.File(commonConfig)];
}else{
	transports = [new winston.transports.Console(commonConfig)];
}

const logger = new winston.Logger({
    transports: transports,
    exitOnError: false
});

export default logger;