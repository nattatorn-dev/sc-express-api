import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import routes from '../routes';
import expressValidation from 'express-validation';
import NotFound from '../helpers/NotFound';
import Response from '../helpers/Response';
import payload from '../utils/payload';

const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());

// disable 'X-Powered-By' header in response
app.disable('x-powered-by');

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /v1 path
app.use('/v1', routes);

// payload handler
app.use(function(obj, req, res, next){
	if(obj instanceof Response){
		return res.status(200).json(payload.normal(obj.data));
	}else if (obj instanceof expressValidation.ValidationError){
		return res.status(400).json(payload.invalidParam(obj.errors));
	}else if(obj instanceof NotFound){
		return res.status(404).json(payload.noRecord());
	}else {
		return res.status(500).json(payload.systemError(obj));
	}
});

export default app;
