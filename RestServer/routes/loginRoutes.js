var express = require('express');
var router = express.Router();
var userController = require('../controllers/loginController');

/*
 * GET
 */
router.get('/', loginController.isLogged);

/*
 * POST
 */
router.post('/', userController.login);

/*
 * DELETE
 */
router.delete('/', userController.logout);

module.exports = router;
