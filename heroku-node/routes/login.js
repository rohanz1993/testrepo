/**
 * New node file
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login";

exports.checkLogin = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var username = req.param("username");
	var password = req.param("password");
	console.log(password +" is the object");
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.findOne({username: username, password:password}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				//req.session.username = user.username;
				//console.log(req.session.username +" is the session");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};

exports.addUser = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var username = req.body.username;
	var password = req.body.password;
	console.log(password +" is the object");
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.insertOne({username: username, password:password}, function(err, user){
			if (user) {
				json_responses = {"statusCode" : 200, "result":user};
				res.send(json_responses);
			} else {
				json_responses = {"statusCode" : 401,"result":err};
				res.send(json_responses);
			}
		});
	});
};
exports.delUser = function(req,res){
	
	var username = req.body.username;
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');
		var ObjectId = require('mongodb').ObjectID;
		coll.deleteOne({username: username},function(err, user){
			if (user) {
				json_responses = {"statusCode" : 200, "result":user};
				res.send(json_responses);
			} else {
				json_responses = {"statusCode" : 401,"result":err};
				res.send(json_responses);
			}
		});
	});
};

exports.updateUser = function(req,res){
	
	var username = req.body.username;
	var password = req.body.password;
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.updateOne({username: username},{ $set: {password:password}}, function(err, user){
			if (user) {
				json_responses = {"statusCode" : 200, "result":user};
				res.send(json_responses);
			} else {
				json_responses = {"statusCode" : 401,"result":err};
				res.send(json_responses);
			}
		});
	});
};
exports.getAll = function(req,res){

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.find().toArray(function(err, user){
			if (user) {
				json_responses = {"statusCode" : 200, "result":user};
				console.log(json_responses);
				res.send(json_responses);
			} else {
				json_responses = {"statusCode" : 401,"result":err};
				res.send(json_responses);
			}
		});
	});
};


//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(true)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		//res.render("homepage",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};

//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	//req.session.destroy();
	res.redirect('/');
};

