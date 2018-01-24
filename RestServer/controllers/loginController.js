const userModel = require('../models/userModel');
const sha256 = require('sha256');

/**
 * loginController.js
 *
 * @description :: Server-side logic for managing login.
 */
module.exports = {

    /**
     * loginController.isLogged()
     */
    isLogged: function (req, res) {
        if(req.session.user != null)
            return res.json({message: {logged: true, user: req.session.user}, err: null});
        else return res.json({message: {logged: false, user: null},  err: null});
    },

    /**
     * loginController.login()
     */
    login: function (req, res) {
        if(req.session.user != null) {
            // already logged in
            res.json({message: {logged: true, user: req.session.user}, err: "Already logged"});
        }
        var email = req.body.email;
        var password = req.body.password;
        if(email != null && password != null) {
            userModel.findOne({email: email}, function(err, response){
                if(err || !response) return res.status(403).json({message: {logged: false, user: null}, err: "Invalid email"});
                if(sha256(response.salt + password) == response.password) {
                    req.session.user = {
                        _id: response._id,
                        email: response.email,
                        name: response.name,
                    };
                    return res.json({message: {logged: true, user: req.session.user}, err: null});
                }
                else return res.status(401).json({message: {logged: false, user: null}, err: "Invalid password"});
            });
        }
        else return res.status(403).json({message: {logged: false, user: null}, err: "Email or password empty"});
    },

    /**
     * loginController.logout()
     */
    logout: function (req, res) {
        req.session.user = null;
        return res.json({message: {logged: false, user: null}, err: null}); 
    }
};
