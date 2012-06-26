/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	path = require("path"),
	//mongoose = require('mongoose'),
	models = require('./models'),
	mailer = require('mailer');

var app = module.exports = express.createServer();



// Configuration

app.configure(function () {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret:'space cube' }));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
	app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
	app.use(express.errorHandler());
});


//check models/index.js see how model is defined using mongoose wrapper, similar wrapper can be found for MYSQL
var CommentModel = models.CommentModel;

// Routes

app.get('/', routes.index);



//CRUD(create, read, update, delete) api controllers

app.get('/api', function (req, res) {
	res.send('Tags API is running');
});


//list all comments in database
app.get('/api/comments', function (req, res) {
	return CommentModel.find(function (err, comments) {
		if (!err) {
			return res.send(comments);
		} else {
			return console.log(err);
		}
	});
});

//post a new comment
app.post('/api/comments', function (req, res) {
	var comment;
	console.log("POST: ");
	console.log(req.body);
	comment = new CommentModel({
		name:req.body.name,
		avatar:req.body.avatar,
		start:req.body.start,
		end:req.body.end,
		comment:req.body.comment
	});

	comment.save(function (err) {
		if (!err) {
			return console.log("created");
		} else {
			return console.log(err);
		}
	});
	return res.send(comment);
});


//get a comment by id
app.get('/api/comments/:id', function (req, res) {
	return CommentModel.findById(req.params.id, function (err, comment) {
		if (!err) {
			return res.send(comment);
		} else {
			return console.log(err);
		}
	});
});

//update a comment by id
app.put('/api/comments/:id', function (req, res) {
	return CommentModel.findById(req.params.id, function (err, comment) {
		comment.name = req.body.name,
			comment.avatar = req.body.avatar,
			comment.start = req.body.start,
			comment.end = req.body.end,
			comment.comment = req.body.comment
		return comment.save(function (err) {
			if (!err) {
				console.log("updated");
			} else {
				console.log(err);
			}
			return res.send(comment);
		});
	});
});

//delete a comment by id
app.delete('/api/comments/:id', function (req, res){
	return CommentModel.findById(req.params.id, function (err, comment) {
		return comment.remove(function (err) {
			if (!err) {
				console.log("removed");
				return res.send('');
			} else {
				console.log(err);
			}
		});
	});
});

//sending a email through mailer, TODO: needs a local SMTP server running to work
app.post('/mailer', function (req, res) {
	var mail = {};
	console.log("POST: ");
	console.log(req.body);
	mail.host = req.body.host || 'localhost';
	mail.port = req.body.port || '25';
	mail.to = req.body.to;
	mail.from = 'tags@sfu.ca';
	mail.subject = req.body.subject || "No subject";
	mail.body = req.body.body || ""

	mailer.send(mail,function(err, result){
		if (err){

			console.log(err);
		}
	});

	return res.send(mail);
});




app.listen(4444, function () {
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
