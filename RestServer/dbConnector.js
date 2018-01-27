var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var createConnection = function (dbURL, options) {
    var db = mongoose.createConnection(dbURL, options);

    db.on('error', function (err) {
        // If first connect fails because mongod is down, try again later.
        // This is only needed for first connect, not for runtime reconnects.
        // See: https://github.com/Automattic/mongoose/issues/5169
        if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
            console.log(new Date(), String(err));

            // Wait for a bit, then try to connect again
            setTimeout(function () {
                console.log("Retrying first connect...");
                db.openUri(dbURL).catch(() => {});
                // Why the empty catch?
                // Well, errors thrown by db.open() will also be passed to .on('error'),
                // so we can handle them there, no need to log anything in the catch here.
                // But we still need this empty catch to avoid unhandled rejections.
            }, 10 * 1000);
        } else {
            // Some other error occurred.  Log it.
            console.error(new Date(), String(err));
        }
    });

    db.once('open', function () {
        console.log("Connection to db established.");
    });

    return db;
}

module.exports = createConnection;