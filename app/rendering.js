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
var walk = require('walk');

module.exports = function(config){

  // Initialise swig
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


  var themeTemplateDirectory = 'themes/' + config.base.theme + '/templates';
  var gameTemplateDirectory = 'games/' + config.base.game + '/templates';
  var gameJSDirectory = 'games/' + config.base.game + '/js';
  var themeJSDirectory = 'themes/' + config.base.theme + '/js';

  // This maps directories to virtual prefixes
  var templateDirectories = [];
  templateDirectories.push(['templates/', 'base']);
  templateDirectories.push([themeTemplateDirectory]);
  templateDirectories.push([gameTemplateDirectory]);
  templateDirectories.push(['js/', 'js']);
  templateDirectories.push(['languages/', 'languages']);
  templateDirectories.push([themeJSDirectory, 'js']);
  templateDirectories.push([gameJSDirectory, 'js']);

  _.each(config.game.components, function(component) {
    templateDirectories.push(['components/' + component + '/templates/', 'components/' + component]);
    templateDirectories.push(['components/' + component + '/js/', 'components/' + component + '/js'])
  });

  //  This is a mapping between the 'virtual' location and the real location
  var compiledFiles = {};

  // Recursively move through each templateDirectory converting it into the 
  // compiledFiles object
  function parseTemplateDirectory(parsingFinished) {
    var map = templateDirectories.shift();
    if (map) {
      directory = map[0];
      prefix = map[1] || '';

      // Turn the templateDirectories + prefixes into a virtual dir structure
      var walker = walk.walkSync(__dirname + '/../' + directory, {
        followLinks: false,
      });

      walker.on("file", function (root, fileStats, next) {
        var content = fs.readFileSync(root + '/' + fileStats.name, 'utf8');

        var dependencies = [];

        var extends_match = content.match(/{% extends "(.+?)" %}/g);
        if (extends_match) {
          _.each(extends_match, function(match) {
            dependencies.push(match.match(/"(.+)"/)[1]);
          });
        }

        var include_match = content.match(/{% include "(.+?)" %}/g);
        if (include_match) {
          _.each(include_match, function(match) {
            dependencies.push(match.match(/"(.+)"/)[1]);
          });
        }

        var newPrefix = prefix + root.substring(__dirname.length +
                                                          directory.length + 4);

        if (!(newPrefix === '')) {
          newPrefix += '/';
        }

        compiledFiles[newPrefix + fileStats.name] = [content, dependencies];
      });

      walker.on("end", function () {
        parseTemplateDirectory(parsingFinished);
      });
    } else {
      parsingFinished();
    }
  }

  // Order everything so dependencies are compiled in the correct order
  function getCompileOrder(unordered) {
    function calculateWeight(key) {
      return 1 + _.reduce(unordered[key][1], function(memo, key) {
        return memo + calculateWeight(key);
      }, 0);
    }

    function addWeight(key) {
      return {"key": key, "weight": calculateWeight(key)};
    }

    return _.chain(unordered).keys()
                              .map(addWeight)
                              .sortBy('weight')
                              .pluck('key')
                              .value()
  }

  /**
   * Generate the components.html template to be included
   */
  function addComponents() {
    var dependencies = _.map(config.game.components, function(dependency) {
      return 'components/' + dependency + '/index.html';
    });

    var components = _.reduce(dependencies, function(memo, key) {
      return memo + '{% include "' + key + '" %}'
    }, '');

    compiledFiles['components.html'] = [components,dependencies];
  }

  /**
   * Generate the languages.js file to be included
   */
  function addLanguages(callback) {
    var dependencies = [];

    var walker = walk.walkSync(__dirname + '/../languages', {
      followLinks: false,
    });

    walker.on("file", function (root, fileStats, next) {
      dependencies.push('languages/' + fileStats.name);
    });

    walker.on("end", function() {
      var languages = _.reduce(dependencies, function(memo, key) {
      return memo + '{% include "' + key + '" %}'
    }, '');

      compiledFiles['languages.js'] = [languages, dependencies];

      callback();
    });
  }

  function parsingFinished() {
    addComponents();
    addLanguages(function() {
      var compileOrder = getCompileOrder(compiledFiles);
      _.each(compileOrder, function(key) {
        compiledFiles[key] = swig.compile(compiledFiles[key][0], { filename: key });
      });
    });
  }

  parseTemplateDirectory(parsingFinished);

  // The variables sent to all templates
  var default_variables = {};
  default_variables['sample_code'] = fs.readFileSync('games/' +
                                      config.base.game + '/js/sample_code.js');
  default_variables['config'] = config;

  return function(template, variables) {
    var vars = _.extend({}, default_variables, variables);

    /**
     * Render a template
     */
     return compiledFiles[template](vars);
  };
};