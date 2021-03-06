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
 * This is mostly used for connecting the buttons/etc on the page to functions
 */


// Reset sample code
$('.competition-reset').live('click', function() {
  v.code(sampleCode);
  return false;
});

// Start a new game
$('.competition-new-game').live('click', function() {
  newGame();
  return false;
});

// Add a player
$('.competition-add-player').live('click', function() {
	addPlayer();
	return false;
});

// Remove a player
$('.competition-remove-player').live('click', function() {
	removePlayer();
	return false;
});

// Start game
$('.competition-start-game').live('click', function() {
	startGame();
	return false;
});

// Pause/Resume game
$('.competition-pause-resume-game').live('click', function() {
	pauseResumeGame();
	return false;
});

// End game
$('.competition-end-game').live('click', function() {
	endGame();
	return false;
});