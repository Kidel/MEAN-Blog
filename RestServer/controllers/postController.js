var postModel = require('../models/postModel');
var userModel = require('../models/userModel');

/**
 * postController.js
 *
 * @description :: Server-side logic for managing posts.
 */
module.exports = {

    /**
     * postController.list()
     */
    list: function (req, res) {
        postModel.find().populate('author').exec(function (err, posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post.',
                    error: err
                });
            }
            return res.json(posts);
        });
    },

    /**
     * postController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        postModel.findOne({_id: id}).populate('author').exec(function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post.',
                    error: err
                });
            }
            if (!post) {
                return res.status(404).json({
                    message: 'No such post'
                });
            }
            return res.json(post);
        });
    },

    /**
     * postController.create()
     */
    create: function (req, res) {
        var post = new postModel({
			title : req.body.title,
			body : req.body.body,
			tags : req.body.tags,
			author : req.body.author

        });

        post.save(function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating post',
                    error: err
                });
            }
            return res.status(201).json(post);
        });
    },

    /**
     * postController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        postModel.findOne({_id: id}, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting post',
                    error: err
                });
            }
            if (!post) {
                return res.status(404).json({
                    message: 'No such post'
                });
            }

            post.title = req.body.title ? req.body.title : post.title;
			post.body = req.body.body ? req.body.body : post.body;
            post.tags = req.body.tags ? req.body.tags : post.tags;
            post.comments = req.body.comments ? req.body.comments : post.comments;
            post.author = req.body.author ? req.body.author : post.author;
            post.edited = Date.now();
			
            post.save(function (err, post) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating post.',
                        error: err
                    });
                }

                return res.json(post);
            });
        });
    },

    /**
     * postController.addComment()
     */
    addComment: function (req, res) {
        var id = req.params.id;
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, user) {
                if(err) return res.status(403).json({err: "Corrupt session or database not available"});
                postModel.findOne({_id: id}, function (err, post) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when getting post',
                            error: err
                        });
                    }
                    if (!post) {
                        return res.status(404).json({
                            message: 'No such post'
                        });
                    }

                    if(req.body.comment) {
                            post.comments.add({
                                _id: user._id,
                                email: user.email,
                                name: user.name,
                                comment: req.body.comment
                            });
                    }
                    
                    post.save(function (err, post) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error when updating post.',
                                error: err
                            });
                        }

                        return res.json(post);
                    });
                });
            });
        }
        else {
            return res.status(400).json({
                message: 'Error when updating post.',
                error: 'Not logged in or corrupted session'
            });
        }
    },

    /**
     * postController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        postModel.findByIdAndRemove(id, function (err, post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the post.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
