const userModel = require('../models/userModel');
const postModel = require('../models/postModel');

const DEBUG = false;

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
        if(DEBUG && req.body.bypassAuth) return next();
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(!response || err) return res.status(403).json({err: "Corrupt session or database not available"});
                if(response.auth < 255 ) return res.status(403).json({err: "Not sufficient permissions"});
                return next();
            });
        }
        return res.status(403).json({err: "Not logged in"});
    },

    /**
     * authController.canAddComment()
     * TODO could be based on post settings
     */
    canAddComment: function (req, res, next) {
        if(DEBUG && req.body.bypassAuth) return next();
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(!response || err) return res.status(403).json({err: "Corrupt session or database error"});
                if(response.auth <= 0 ) return res.status(403).json({err: "User banned"});
                return next();
            });
        }
        return res.status(403).json({err: "Not logged in"});
    },

    /**
     * authController.canSeeUserList()
     * TODO: could be based on friend list
     */
    canSeeUserList: function (req, res, next) {
        if(DEBUG && req.body.bypassAuth) return next();
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(!response || err) return res.status(403).json({err: "Corrupt session or database error"});
                if(response.auth < 255 ) return res.status(403).json({err: "Not sufficient permissions"});
                return next();
            });
        }
        return res.status(403).json({err: "Not logged in"});
    },

    /**
     * authController.canSeeUserByEmail()
     * TODO: could be based on friend list or block list
     */
    canSeeUserByEmail: function (req, res, next) {
        if(DEBUG && req.body.bypassAuth) return next();
        var email = req.params.email;
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(!response || err) return res.status(403).json({err: "Corrupt session or database error"});
                if(response.auth < 255 && email != user.email) return res.status(403).json({err: "Not sufficient permissions"});
                return next();
            });
        }
        return res.status(403).json({err: "Not logged in"});
    },

    /**
     * authController.canSeeUser()
     * TODO: could be based on friend list or block list
     */
    canSeeUser: function (req, res, next) {
        if(DEBUG && req.body.bypassAuth) return next();
        var id = req.params.id;
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(!response || err) return res.status(403).json({err: "Corrupt session or database error"});
                if(response.auth < 255 && id != user._id) return res.status(403).json({err: "Not sufficient permissions"});
                return next();
            });
        }
        return res.status(403).json({err: "Not logged in"});
    },

    /**
     * authController.canEditUser()
     */
    canEditUser: function (req, res, next) {
        if(DEBUG && req.body.bypassAuth) return next();
        var id = req.params.id;
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(!response || err) return res.status(403).json({err: "Corrupt session or database error"});
                if(response.auth < 255 && id != user._id) return res.status(403).json({err: "Not sufficient permissions"});
                return next();
            });
        }
        return res.status(403).json({err: "Not logged in"});
    },

    /**
     * authController.canEditPost()
     */
    canEditPost: function (req, res, next) {
        if(DEBUG && req.body.bypassAuth) return next();
        var id = req.params.id;
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, user){
                if(!response || err) return res.status(403).json({err: "Corrupt session or database error"});
                postModel.findOne({_id: id}).populate('author').exec(function(err, post){
                    if(!response || err) return res.status(503).json({err: "Database error"});
                    if(user.auth < 255 && post.author._id != user._id) return res.status(403).json({err: "Not sufficient permissions"});
                    // admin or own user
                    return next();
                });
            });
        }
        return res.status(403).json({err: "Not logged in"});
    },

    /**
     * authController.canAddPost()
     */
    canAddPost: function (req, res, next) {
        if(DEBUG && req.body.bypassAuth) return next();
        if(req.session.email != null) {
            userModel.findOne({email: req.session.email}, function(err, response){
                if(!response || err) return res.status(403).json({err: "Corrupt session or database not available"});
                if(response.auth <= 0 ) return res.status(403).json({err: "User banned"});
                return next();
            });
        }
        return res.status(403).json({err: "Not logged in"});
    }

};
