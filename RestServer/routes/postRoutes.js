var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');
var authController = require('../controllers/authController');

/*
 * GET
 */
router.get('/', postController.list);

/*
 * GET
 */
router.get('/:page', postController.list);

/*
 * GET
 */
router.get('/id/:id', postController.show);

/*
 * POST
 */
router.post('/', authController.canAddPost);
router.post('/', postController.create);

/*
 * POST
 */
router.post('/:id', authController.canAddComment);
router.post('/:id', postController.addComment);

/*
 * PUT
 */
router.put('/:id', authController.canEditPost);
router.put('/:id', postController.update);

/*
 * DELETE
 */
router.delete('/:id', authController.canEditPost);
router.delete('/:id', postController.remove);

module.exports = router;
