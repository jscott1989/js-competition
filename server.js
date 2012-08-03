var express = require('express'); // HTTP Server
var swig = require('swig');
var fs = require('fs'); // Filesystem access
require('js-yaml'); // YAML for config files

// Read the config
var config = require(__dirname + '/config/config.yaml')[0];

// Set up the server
var app = express.createServer(express.logger());

app.register('.html', swig);
app.register('.js', swig);
app.set('view engine', 'html');
app.set('view options', { layout: false });
app.use('/static', express.static(__dirname + '/static'));
app.use('/themes', express.static(__dirname + '/themes'));
swig.init({
    root: __dirname + '/themes',
    allowErrors: true // allows errors to be thrown and caught by express
});

app.set('views', __dirname + '/themes');

// Requesting the homepage
app.get('/', function(request, response) {
	// Read the sample code (TODO: Read this on startup, cache)
	fs.readFile('games/' + config.game_type + '/sample_code.js', function(err,sample_code){
		response.render(config.theme + '/index.html', { 'title': config.title, 'sample_code': sample_code });
	});
});

app.get('/js/viewmodel.js', function(request, response) {
	fs.readFile('static/js/viewmodel.js', 'ascii', function(err,viewmodel){
		var compiled = swig.compile(viewmodel, { filename: 'viewmodel' })({"config": config});
		response.send(compiled);
	});
});

// Pass the custom gamerunner
app.get('/gamerunner.js', function(request, response) {
	fs.readFile('games/' + config.game_type + '/gamerunner.js', function(err,gamerunner){
		response.render('gamerunner.js', { 'gamerunner': gamerunner });
	});
});

// Listen on 3000 by default
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});