var userModel = require('../models/UserModel');
var postModel = require('../models/postModel');

/**
 * authController.js
 *
 * @description :: Server-side logic for managing auth.
 */
module.exports = {

    /**
     * authController.canAddUser()
     */
    canAddUser: function (req, res, next) {
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(err) return res.status(403).json({err: "Corrupt session or database not available"});
                if(response.auth < 255 ) return res.status(403).json({err: "Not sufficient permissions"});
                next();
            });
        }
    },

    /**
     * authController.canAddComment()
     * TODO could be based on post settings
     */
    canAddComment: function (req, res, next) {
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(err) return res.status(403).json({err: "Corrupt session or database not available"});
                if(response.auth < 0 ) return res.status(403).json({err: "User banned"});
                next();
            });
        }
    },

    /**
     * authController.canSeeUserList()
     * TODO: could be based on friend list
     */
    canSeeUserList: function (req, res, next) {
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(err) return res.status(403).json({err: "Corrupt session or database not available"});
                if(response.auth < 255 ) return res.status(403).json({err: "Not sufficient permissions"});
                next();
            });
        }
    },

    /**
     * authController.canSeeUserByEmail()
     * TODO: could be based on friend list or block list
     */
    canSeeUserByEmail: function (req, res, next) {
        var email = req.params.email;
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(err) return res.status(403).json({err: "Corrupt session or database not available"});
                if(response.auth < 255 && email != user.email) return res.status(403).json({err: "Not sufficient permissions"});
                next();
            });
        }
    },

    /**
     * authController.canSeeUser()
     * TODO: could be based on friend list or block list
     */
    canSeeUser: function (req, res, next) {
        var id = req.params.id;
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(err) return res.status(403).json({err: "Corrupt session or database not available"});
                if(response.auth < 255 && id != user._id) return res.status(403).json({err: "Not sufficient permissions"});
                next();
            });
        }
    },

    /**
     * authController.canEditUser()
     */
    canEditUser: function (req, res, next) {
        var id = req.params.id;
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(err) return res.status(403).json({err: "Corrupt session or database not available"});
                if(response.auth < 255 && id != user._id) return res.status(403).json({err: "Not sufficient permissions"});
                next();
            });
        }
    },

    /**
     * authController.canEditPost()
     */
    canEditPost: function (req, res, next) {
        var id = req.params.id;
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, user){
                if(err) return res.status(403).json({err: "Corrupt session or database not available"});
                postModel.findOne({_id: id}).populate('author').exec(function(err, post){
                    if(err) return res.status(503).json({err: "Database not available"});
                    if(user.auth < 255 && post.author._id != user._id) return res.status(403).json({err: "Not sufficient permissions"});
                    // admin or own user
                    next();
                });
            });
        }
    },

        /**
     * authController.canAddPost()
     */
    canAddPost: function (req, res, next) {
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(err) return res.status(403).json({err: "Corrupt session or database not available"});
                if(response.auth < 0 ) return res.status(403).json({err: "User banned"});
                next();
            });
        }
    }

};
