var express = require('express');
var routes = require('./routes')
, http = require('http')
, path = require('path');
var app = express();


//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://ec2-52-26-15-244.us-west-2.compute.amazonaws.com:27017/login";
//var expressSession = require("express-session");
//var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var login = require("./routes/login");


//all environments
// set the port of our application
// process.env.PORT lets the port be set by Heroku
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(express.methodOverride());
/*app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));*/

app.use(app.router);
app.get('/', routes.index);

//POST Requests
app.post('/checklogin', login.checkLogin);
app.post('/logout', login.logout);
app.post('/addUser',login.addUser);
app.post('/delUser',login.delUser);
app.post('/updateUser',login.updateUser);
app.get('/getAll',login.getAll);


// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});