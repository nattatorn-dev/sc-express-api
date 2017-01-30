import express from 'express';
import userCtrl from '../controllers/user';
import validate from 'express-validation';
import request from '../middlewares/request';
import errorCatcher from '../utils/errorCatcher';
import Validator from '../utils/validator';

const router = express.Router();	// eslint-disable-line new-cap


const rules = {
  getUsers: {
    query: {
      userName: Validator.User.userName.optional(),
      email: Validator.User.email.optional(),
      mobile: Validator.User.mobile.optional(),
      page: Validator.List.page.optional(),
      count: Validator.List.count.optional(),
      fields: Validator.List.fields.optional(),
      sorts: Validator.List.sorts.optional(),
    },
  },
  getUser: {
    params: {
      userId: Validator.User.userId.required(),
      fields: Validator.List.fields.optional(),
    },
  },
  createUser: {
    body: {
      userName: Validator.User.userName.required(),
      email: Validator.User.email.required(),
      mobile: Validator.User.mobile.required(),
    },
  },
  updateUser: {
    body: {
      userName: Validator.User.userName.required(),
      email: Validator.User.email.required(),
      mobile: Validator.User.mobile.required(),
    },
    params: {
      userId: Validator.User.userId.required(),
    },
  },
  deleteUser: {
    params: {
      userId: Validator.User.userId.required(),
    },
  },
};

router.get('/', validate(rules.getUsers), request.handleFields,
request.handleListParams, errorCatcher(userCtrl.getUsers));

router.get('/:userId', validate(rules.getUser), request.handleFields,
errorCatcher(userCtrl.getUser));

router.post('/', validate(rules.createUser), errorCatcher(userCtrl.createUser));

router.put('/:userId', validate(rules.updateUser), errorCatcher(userCtrl.updateUser));

router.delete('/:userId', validate(rules.deleteUser), errorCatcher(userCtrl.deleteUser));

export default router;
