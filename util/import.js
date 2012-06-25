//run this to import test data into mongodb

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

var CommentModel = mongoose.model('Comment', Comment);

var data = {"comments":[
	{"name":"cykhorrami", "avatar":"/images/1.jpg", "start":"60", "end":"60", "comment":"Hahah ok. So you are acting as a nolan fan for today?"},
	{"name":"Nick Shannon", "avatar":"/images/1.jpg", "start":"30", "end":"50", "comment":"He told me he was trying to make a point."},
	{"name":"ThatDudeJCrash", "avatar":"/images/1.jpg", "start":"10", "end":"40", "comment":"Awesomeness lol"},
	{"name":"supermaustify", "avatar":"/images/1.jpg", "start":"20", "end":"33", "comment":"i love the music!"},
	{"name":"DarkerPhoenix1", "avatar":"/images/1.jpg", "start":"110", "end":"132", "comment":"Why the fuck he is doing a flip here?"},
	{"name":"sexysteveontour10", "avatar":"/images/1.jpg", "start":"130", "end":"131", "comment":"I'd like to think so , spider-man looks like a movie for 10 year olds!"},
	{"name":"Sovember", "avatar":"/images/1.jpg", "start":"30", "end":"70", "comment":"there's no joker, no joker no go"}
]
};

data.comments.forEach(function(i){


		addComment(i);


})


function addComment(req){
	var comment;
	console.log("SYSTEM - adding new comment: ");
	console.log(req);
	comment = new CommentModel({
		name:req.name,
		avatar:req.avatar,
		start:req.start,
		end:req.end,
		comment:req.comment
	});

	comment.save(function (err) {
		if (!err) {
			return console.log("created");
		} else {
			return console.log(err);
		}
	});
}
