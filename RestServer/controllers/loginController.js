var userModel = require('../models/UserModel');

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
        if(req.session.email != null)
            return res.json({message: {logged: true, email: req.session.email}, err: null});
        else return res.json({message: {logged: false, email: null},  err: null});
    },

    /**
     * loginController.login()
     */
    login: function (req, res) {
        if(req.session.email != null) {
            // already logged in
            res.json({message: {logged: true, email: req.session.email}, err: "Already logged"});
        }
        var email = req.body.email;
        var password = req.body.password;
        if(email != null && password != null) {
            userModel.findOne({email: email}, function(err, response){
                if(err) return res.status(403).json({message: {logged: false, email: null}, err: "Invalid email"});
                if(sha256(response.salt+password) == response.password) {
                    req.session.email = response.email;
                    req.session.name = response.name;
                    return res.json({message: {logged: true, email: email}, err: null});
                }
                else return res.status(401).json({message: {logged: false, email: null}, err: "Invalid password"});
            });
        }
        else return res.status(403).json({message: {logged: false, email: null}, err: "Email or password empty"});
    },

    /**
     * loginController.logout()
     */
    logout: function (req, res) {
        req.session.email = null;
        return res.json({message: {logged: false, email: null}, err: null}); 
    }
};
