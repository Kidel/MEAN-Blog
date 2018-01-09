var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var checkAuth = require('../modules/checkAuth');

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * GET
 */
router.get('/email/:email', userController.showByMail);

/*
 * POST
 */
router.post('/', userController.create);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
