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
		v.game.randomNumber = ko.observable(0);
	});

	events.on("start", function(v) {
		v.game.randomNumber(Math.floor(Math.random()*10)+1);
		events.emit("log", "Number is " + v.game.randomNumber());
	});

	events.on("next_turn", function(player) {
		console.log(player);
		// Once magic methods are available ideally I'd like this to be player.take_turn()
		// for now, this is probably the best we can do to keep it language agnostic
		var guess = player.ai().callFunction("take_turn");

		events.emit("log", player.id + " guessed " + guess);
		if (guess == v.game.randomNumber()) {
			player.score(player.score() + 1);
		}
	});
})();