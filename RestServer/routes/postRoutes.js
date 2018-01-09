var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');
var checkAuth = require('../modules/checkAuth');

/*
 * GET
 */
router.get('/', postController.list);

/*
 * GET
 */
router.get('/:id', postController.show);

/*
 * POST
 */
router.post('/', postController.create);

/*
 * PUT
 */
router.put('/:id', postController.update);

/*
 * DELETE
 */
router.delete('/:id', postController.remove);

module.exports = router;
