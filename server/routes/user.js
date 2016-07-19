import express from 'express';
import userCtrl from '../controllers/user';
import validate from 'express-validation';
import request from '../middlewares/request';
import errorCatcher from '../utils/errorCatcher';
import Validator from '../utils/validator';

const router = express.Router();	// eslint-disable-line new-cap
/**
* @swagger
* definition:
*  user:
*   type: object
*   required:
*     - userName
*     - email
*     - mobile
*   properties:
*     userName:
*       type: string
*     email:
*       type: string
*       default: test@email.com
*     mobile:
*       type: string
*       default: "23456789"
*/
/**
 * @swagger
 * /users:
 *   get:
 *     description: Get User List
 *     produces:
 *       - application/json
 *     tags:
 *       - UsersApi
 *     parameters:
 *       - name: userName
 *         description: userName
 *         in: query
 *         required: false
 *         type: string
 *       - name: email
 *         description: email
 *         in: query
 *         required: false
 *         type: string
 *       - name: mobile
 *         description: mobile
 *         in: query
 *         required: false
 *         type: string
 *       - name: page
 *         description: page No (Default 0)
 *         in: query
 *         required: false
 *         type: integer
 *       - name: count
 *         description: pageSize (Default 10)
 *         in: query
 *         required: false
 *         type: integer
 *       - name: fields
 *         description: filter fields (separate with ',')
 *         in: query
 *         required: false
 *         type: string
 *       - name: sorts
 *         description: sorts fields (separate with ',')
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: (4001) validation error
 *       500:
 *         description: (5001) database error
 */
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get User Detail
 *     produces:
 *       - application/json
 *     tags:
 *       - UsersApi
 *     parameters:
 *       - name: id
 *         description: userId
 *         in: path
 *         required: true
 *         type: string
 *       - name: fields
 *         description: filter fields
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: (4001) validation error
 *       404:
 *         description: (4004) no record is found
 *       500:
 *         description: (5001) database error
 */
 /**
 * @swagger
 * /users:
 *   post:
 *     description: Create User (body request)
 *     produces:
 *       - application/json
 *     tags:
 *       - UsersApi
 *     parameters:
 *       - name: body
 *         description: body
 *         in: body
 *         required: true
 *         schema:
*           $ref: "#/definitions/user"
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: (4001) validation error
 *       500:
 *         description: (5001) database error
 */
 /**
 * @swagger
 * /users/{id}:
 *   put:
 *     description: Update User
 *     produces:
 *       - application/json
 *     tags:
 *       - UsersApi
 *     parameters:
 *       - name: id
 *         description: userId
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: body
 *         in: body
 *         required: true
 *         schema:
*           $ref: "#/definitions/user"
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: (4001) validation error
 *       404:
 *         description: (4004) no record is found
 *       500:
 *         description: (5001) database error
 */
 /**
 * @swagger
 * /users/{id}:
 *   delete:
 *     description: Delete User (body request)
 *     produces:
 *       - application/json
 *     tags:
 *       - UsersApi
 *     parameters:
 *       - name: id
 *         description: userId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: (4001) validation error
 *       404:
 *         description: (4004) no record is found
 *       500:
 *         description: (5001) database error
 */

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
