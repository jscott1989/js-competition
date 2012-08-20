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
 * This contains core game functionality - delegating much of the work to the
 * game specific gamerunner
 */

function Player(id, ai) {
  this.id = id;
  this.ai = ai;
}

// AIs which can play in a game
v.ais = ko.observableArray([
  {id: "my_ai", name: "My AI"},
  {id: "sample_ai", name: "Sample AI"}
]);

v.game = {
  state: ko.observable(null),
  players: ko.observableArray(),
  isPaused: ko.observable(false)
};

var nextPlayerID = 1;

/**
 * Add a player to the game
 */
function addPlayer() {
  v.game.players.push(new Player(nextPlayerID++,(nextPlayerID == 2) ? v.ais()[0] : v.ais()[1]));
}

/**
 * Remove the last added player from the game
 */
function removePlayer() {
  v.game.players.pop();
  nextPlayerID--;
}

/**
 * Start a new game
 */
function newGame() {
  v.game.state('settings');

  v.game.players.removeAll();
  nextPlayerID = 1;

  for (var i = 0; i < v.config.game.default_players(); i++) {
  	addPlayer();
  }
}

/**
 * Start the game playing
 */
function startGame() {
  // for (var i = 0; i < viewModel.players().length; i++) {
  //   var player = viewModel.players()[i];
  //   player.code = getCode(player.ai.id);
  // }
  
  v.game.state('playing');
  v.game.isPaused(false);
}

function pauseResumeGame() {
  v.game.isPaused(!viewModel.game.isPaused());
}

function endGame() {
  v.game.state(null);
}