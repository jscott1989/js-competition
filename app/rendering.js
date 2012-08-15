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
 * This is needed because swig doesn't support multiple roots. To allow the
 * directory structure to be clean we need to pre-compiled pretending they are
 * in a single directory root.
 */

var swig = require('swig');
var fs = require('fs');
var _ = require('underscore');

module.exports = function(config){
  var templateDirectory = '../templates'
  var themeTemplateDirectory = '../themes/' + config.base.theme + '/templates'
  var gameTemplateDirectory = '../games/' + config.base.game + '/templates'

  swig.init({
      allowErrors: false,
      autoescape: true,
      cache: true,
      encoding: 'utf8',
      filters: {},
      root: './../',
      tags: {},
      extensions: {},
      tzOffset: 0
  });

  //  This is a mapping between the "virtual" location and the real location
  var compiledFiles = {
    "base/layout.html" : "templates/layout.html",
    "layout.html" : "themes/basic/templates/layout.html",
    "index.html" : "themes/basic/templates/index.html"
  };

  _.each(compiledFiles, function(filePath, key) {
    var content = fs.readFileSync(filePath, "utf8");
    compiledFiles[key] = swig.compile(content, { filename: key });
  });

  return function(template, variables) {
    /**
     * Render a template
     */
     return compiledFiles[template](variables);
  };
};