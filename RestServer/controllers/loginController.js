var User = require('../models/UserModel');

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
            return res.json({logged: true, email: req.session.email, err: null});
        else return res.json({logged: false,  err: null});
    },

    /**
     * loginController.login()
     */
    login: function (req, res) {
        if(req.session.email != null) {
            // already logged in
            res.json({logged: true, email: req.session.email, err: "already logged"});
        }
        var email = req.body.email;
        var password = req.body.password;
        if(email != null && password != null) {
            User.findOne({email: email}, function(err, response){
                if(err) return res.json({logged: false, email: null, err: "invalid email"});
                if(sha256(response.salt+password) == response.password) {
                    req.session.email = response.email;
                    req.session.name = response.name;
                    return res.json({logged: true, email: email, err: null});
                }
                else return res.json({logged: false, email: null, err: "invalid password"});
            });
        }
        else return res.json({logged: false, email: null, err: "email or password empty"});
    },

    /**
     * loginController.logout()
     */
    logout: function (req, res) {
        req.session.email = null;
        return res.json({logged: false, email: null, err: null}); 
    }
};
