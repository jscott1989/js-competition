var express = require('express'); // HTTP Server
var swig = require('swig'); // Server side templates
var fs = require('fs'); // Filesystem access
var less = require('less');

require('js-yaml'); // YAML for config files

// Read the config
var config = require(__dirname + '/config/config.yaml')[0];

// Set up the server
var app = express.createServer(express.logger());

swig.init({
    root: __dirname + '/themes',
    allowErrors: true // allows errors to be thrown and caught by express
});

app.register('.html', swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/themes');
app.set('view options', { layout: false });

app.use("/static", express.static(__dirname + '/themes'));

// Less parser
var less_parser = new(less.Parser)({
	paths: ['./themes/base/less/', './themes/' + config.theme + '/less'],
	filename: 'style.less'
});

var compiled_css = '';
less_parser.parse('@import "base_main.less"; @import "main.less";', function(e, tree) {
	compiled_css = tree.toCSS();
});

// Requesting the homepage
app.get('/', function(request, response) {
	// Read the sample code (TODO: Read this on startup, cache)
	fs.readFile('games/' + config.game_type + '/sample_code.js', function(err,sample_code){
		response.render(config.theme + '/index.html', { 'config': config, 'sample_code': sample_code });
	});
});

app.get('/js/:filename.js', function(request, response) {
	response.header('Content-Type', 'application/javascript');
	var filename = request.route.params.filename;
	var filepath = __dirname + "/themes/base/js/" + filename + ".js";
	fs.exists(filepath, function(exists) {
		if (!exists) {
			filepath = __dirname + "/themes/" + config.theme + "/js/" + filename + ".js";
		}

		fs.readFile(filepath, 'utf8', function(err,js){
			if (filename == 'viewmodel') {
				js = swig.compile(js, { filename: filename })({"config": config});
			}
			response.send(js);
		});
	});
});

app.get('/css/style.css', function(request, response) {
	response.header('Content-Type', 'text/css');
	response.send(compiled_css);
});


// Listen on 3000 by default
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});