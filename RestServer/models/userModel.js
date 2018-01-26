var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'name' : { type: String, required: true }, 
	'email' : { type: String, required: true, unique: true, index: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Not a valid email address'] },
	'password' :  { type: String, required: true, select: false },
	'salt' : { type: Number, required: true, select: false },
	'authority' : { type: Number, required: true, default: 1 }, // 1=user, 255=admin, 0=banned
	'created' : { type: Date, default: Date.now },
	'edited' : { type: Date, default: null }
});

module.exports = mongoose.model('user', userSchema);
