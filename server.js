var express = require('express');

var app = express.createServer(express.logger());

app.set('view options', { layout: false });
app.use('/static', express.static(__dirname + '/static'));

// var redis = require('redis-url').connect(process.env.REDISTOGO_URL);

// redis.set('foo', 'bar');

// redis.get('foo', function(err, value) {
//   console.log('foo is: ' + value);
// });

app.get('/', function(request, response) {
	response.render('index.jade', { title: 'JS Competition' });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});