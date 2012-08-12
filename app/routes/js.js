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
	* Routes for static JS files
	*/

var _ = require('underscore');
var fs = require('fs');

module.exports = function(app, javascriptDirectory, themeJavascriptDirectory,
																											gameJavascriptDirectory) {

	var directories = [javascriptDirectory, themeJavascriptDirectory, 
																											gameJavascriptDirectory];

	app.get(/^\/js\/(.*)\.js/, function(request, response) {
		var filename = request.params[0];
		response.header('Content-Type', 'application/javascript');

		// This returns the filepath + name of a matching .js file from the selected
		// game and theme (or base), if it doesn't exist - returns undefined
		var file = _.chain(directories).map(function(directory) {
			return directory + '/' + filename + '.js';
		}).filter(function(file) {
			return fs.existsSync(file);
		}).first().value();

		if (!file) {
			response.status(404).send('Not found');
			return;
		}
		response.send(fs.readFileSync(file, "utf8"));
	});
};