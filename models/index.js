var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tag_database');

var Schema = mongoose.Schema;



var Comment = new Schema({
	name:{ type:String, required:true },
	avatar:{ type:String, default:"/images/1.jpg" },
	comment:{ type:String, required:true },
	start:{ type:Number, required:true }, //start time of tag, must be a number
	end:{ type:Number, required:false }, //end time of a tag, must be a number
	modified:{ type:Date, default:Date.now } //auto insert, don't worry about this
});

exports.CommentModel = mongoose.model('Comment', Comment);
