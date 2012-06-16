var express = require('express'); // HTTP Server
var fs = require('fs'); // Filesystem access
require('js-yaml'); // YAML for config files

// Read the config
var config = require('config/config.yaml')[0];

// A string to load the config in the client
var configJS = 'var config = ' + JSON.stringify(config) + ';';

// Set up the server
var app = express.createServer(express.logger());

app.set('view options', { layout: false });
app.use('/static', express.static(__dirname + '/static'));

// Requesting the homepage
app.get('/', function(request, response) {
	// Read the sample code (TODO: Read this on startup, cache)
	fs.readFile('games/' + config.game_type + '/sample_code.js', function(err,sample_code){
		response.render('index.jade', { 'title': config.title, 'sample_code': sample_code });
	});
});

// Just pass the config
app.get('/config.js', function(request, response) {
	response.send(configJS)
});

// Pass the custom gamerunner
app.get('/gamerunner.js', function(request, response) {
	fs.readFile('games/' + config.game_type + '/gamerunner.js', function(err,gamerunner){
		response.render('gamerunner.js.jade', { 'gamerunner': gamerunner });
	});
});

// Listen on 3000 by default
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});