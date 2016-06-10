import Joi from 'joi';

const List = {
	page : Joi.number().integer().min(0),
	count : Joi.number().integer().min(0),
	fields : Joi.string(),
	sorts :	Joi.string()
};

const User = {
	userId : Joi.number().integer().min(1),
	userName : Joi.string().min(2).max(30),
	email : Joi.string().email(),
	mobile : Joi.string().regex(/^[1-9][0-9]{7}$/)
};

export default {List, User};