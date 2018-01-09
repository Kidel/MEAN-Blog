var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'name' : { type: String, required: true }, 
	'email' : { type: String, required: true, unique: true },
	'password' :  { type: String, required: true },
	'salt' : { type: Number, required: true },
	'authority' : { type: Number, required: true, default: 1 },
	'created' : { type: Date, default: Date.now },
	'edited' : { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', userSchema);
