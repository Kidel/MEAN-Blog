var express = require('express');
var router = express.Router();
var loginController = require('../controllers/loginController');

/*
 * GET
 */
router.get('/', loginController.isLogged);

/*
 * POST
 */
router.post('/', loginController.login);

/*
 * DELETE
 */
router.delete('/', loginController.logout);

module.exports = router;
