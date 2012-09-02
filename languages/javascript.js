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
(function() {
  var i = 0;
  /**
   * Basic execution environment for Javascript
   * NOTE that this is not an actual sandbox and offers no security
   * (though it will at some point in the future)
   */
  function JavascriptSandbox() {
    this.lol = i++;
    this.iframe = $('<iframe class="sandbox"></iframe>');
    this.iframe.appendTo('body');
    this.iframe = this.iframe[0]
  }

  JavascriptSandbox.prototype.eval = function(code) {
    this.iframe.contentWindow.document.write('<script>' + code + '</script>')
  }

	function callFunction(f) {
    var c = 'parent.callFunctionReturn = ' + f + '();';
    this.sandbox.eval(c);
    return callFunctionReturn;
  }

  events.on('initViewModel', function(v) {
    _.each(v.ais(), function(ai) {
    	if (ai.language == "js") {
    		ai.callFunction = callFunction;
    	}	
    })
  });

  events.on('_start', function(v) {
    _.each(v.game.players(), function(player) {
      if (player.base_ai().language == "js") {
        player.ai(_.extend({}, player.base_ai()));
        // Pull the code into the player
        player.ai().player = player;
        player.ai().sandbox = new JavascriptSandbox();

        if (player.base_ai().id =='my_ai') {
          console.log(player.ai().sandbox.lol, v.code());
          player.ai().sandbox.eval(v.code());
        } else if (player.base_ai().id =='sample_ai') {
          console.log(player.ai().sandbox.lol, sampleCode);
          player.ai().sandbox.eval(sampleCode);
        }
      }
    })
  });
})();