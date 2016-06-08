import express from 'express';
import userCtrl from '../controllers/user';
import validate from 'express-validation';
import Joi from 'joi';
import request from '../middlewares/request';
import errorCatcher from '../utils/errorCatcher';

const router = express.Router();	// eslint-disable-line new-cap

const rules =  {
	getUsers : {
		userName : Joi.string().optional(),
		email : Joi.string().optional(),
		mobile: Joi.string().optional(),
		page : Joi.number().integer().optional(),
		count : Joi.number().integer().optional(),
		fields : Joi.string().optional(),
		sorts : Joi.string().optional(),
	},
	getUser : {
		params: {
			userId: Joi.number().integer().required(),
			fields : Joi.string().optional(),
		}
	},
	createUser: {
		query: {
			userName : Joi.string().required(),
			email : Joi.string().email(),
			mobile: Joi.string().regex(/^[1-9][0-9]{7}$/).required()
		}
	},
	updateUser: {
		query: {
			userName: Joi.string().required(),
			email : Joi.string().email(),
			mobile: Joi.string().regex(/^[1-9][0-9]{7}$/).required()
		},
		params: {
			userId: Joi.number().integer().required()
		}
	},
	deleteUser : {
		params: {
			userId: Joi.number().integer().required()
		}
	}
};


router.get('/', validate(rules.getUsers), request.handleFields, request.handleListParams, errorCatcher(userCtrl.getUsers));

router.get('/:userId', validate(rules.getUser), request.handleFields, errorCatcher(userCtrl.getUser));

router.post('/', validate(rules.createUser), errorCatcher(userCtrl.createUser));

router.put('/:userId', validate(rules.updateUser), errorCatcher(userCtrl.updateUser));

router.delete('/:userId', validate(rules.deleteUser), errorCatcher(userCtrl.deleteUser));

export default router;