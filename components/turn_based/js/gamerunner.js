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
  events.on("initViewModel", function(v) {
  	v.game.turn = ko.observable(1);
  	v.game.currentPlayer = ko.observable(0);

  	// v.game.isFinished = ko.computed(function() {
  	// 	if (viewModel.game.turn() >= viewModel.max_turns()) {
  	// 		return true;
  	// 	}

  	// 	for(var i = 0; i < viewModel.players().length; i++) {
  	// 		if (viewModel.players()[i].score() >= viewModel.max_score()) {
  	// 			return true;
  	// 		}
  	// 	}
  	// 	return false;
  	// });
  });

  function next_turn() {
      console.log('next turn');
      events.emit("next_turn", v.game.players()[v.game.currentPlayer()])

      v.game.currentPlayer(v.game.currentPlayer() + 1);
      if (v.game.currentPlayer() >= v.game.players().length) {
        v.game.turn(v.game.turn() + 1);
        v.game.currentPlayer(0);
      }

      // if (viewModel.game.isFinished()) {
      //   // The game is over
      //   alert('FINSIHED');
      // } else {
      //   setTimeout(base_gamerunner.next_turn, 200);
      // }
    }

  events.on("_start", function(v) {
    events.emit("start", v);
    v.game.currentPlayer(0);
    next_turn(v);
  });
})();