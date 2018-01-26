var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');

/*
 * GET
 */
router.get('/startup', userController.startup);

/*
 * GET
 */
router.get('/', authController.canSeeUserList);
router.get('/', userController.list);

/*
 * GET
 */
router.get('/id/:id', authController.canSeeUser);
router.get('/id/:id', userController.show);

/*
 * GET
 */
router.get('/email/:email', authController.canSeeUserByEmail);
router.get('/email/:email', userController.showByMail);

/*
 * POST
 */
router.post('/', authController.canAddUser);
router.post('/', userController.create);

/*
 * PUT
 */
router.put('/:id', authController.canEditUser);
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', authController.canEditUser);
router.delete('/:id', userController.remove);

module.exports = router;
