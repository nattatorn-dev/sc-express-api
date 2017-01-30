/**
* @swagger
* definitions:
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
