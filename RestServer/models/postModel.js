var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var postSchema = new Schema({
	'title' : { type: String, required: true }, 
	'body' : String,
	'tags' : { type: Array, index: true },
	'comments' : { type: Array, default: [] },
	'created' : { type: Date, default: Date.now, index: true },
	'edited' : { type: Date, default: null },
	'author' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	}
});

module.exports = mongoose.model('post', postSchema);
