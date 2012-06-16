var express = require('express');
var fs = require('fs');
require('js-yaml');

var config = require('config/config.yaml')[0];
var configJS = 'var config = ' + JSON.stringify(config) + ';';
fs.readFile('games/' + config.game_type + '/sample_code.js', function(err,sample_code){
	var app = express.createServer(express.logger());

	app.set('view options', { layout: false });
	app.use('/static', express.static(__dirname + '/static'));

	// var redis = require('redis-url').connect(process.env.REDISTOGO_URL);

	// redis.set('foo', 'bar');

	// redis.get('foo', function(err, value) {
	//   console.log('foo is: ' + value);
	// });

	app.get('/', function(request, response) {
		response.render('index.jade', { 'title': 'JS Competition', 'sample_code': sample_code });
	});

	app.get('/config.js', function(request, response) {
		response.send(configJS)
	});

	app.get('/gamerunner.js', function(request, response) {
		fs.readFile('games/' + config.game_type + '/gamerunner.js', function(err,gamerunner){
			response.render('gamerunner.js.jade', { 'gamerunner': gamerunner });
		});
	});

	var port = process.env.PORT || 3000;
	app.listen(port, function() {
		console.log("Listening on " + port);
	});
});