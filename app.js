/**
 * Copyright (C) 2012 Jonathan Scott
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions: The above copyright
 * notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * This is the entry point to Codefeud coding competition runner
 *
 * Run it with node app.js
 */

var express = require('express');
var app = module.exports = express.createServer();
require('js-yaml'); // YAML for config files

var config = require(__dirname + '/config.yaml');

require('./app/config/environment.js')(app, express);

var render = require('./app/rendering.js')('./templates',
																						'./themes/' + config.theme +
                                                            '/templates',
																						'./games/' + config.game +
                                                            '/templates');

// Include basic pages
require('./app/routes/pages.js')(app, render);
// CSS
require('./app/routes/css.js')(app);
// JS
require('./app/routes/js.js')(app, './js', './themes/' + config.theme + '/js',
                                              './games' + config.game + '/js');

function startServer(port) {
	app.listen(port);
}

if (require.main === module) {
	// Start the server automatically if this is run directly
	var port = process.env.PORT || 3000;
	startServer(port);
}