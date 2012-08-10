var SETTINGS_STATE = "settings";
var PLAYING_STATE = "playing";

var nextPlayerID = 1;

function newGame() {
	viewModel.game.state(SETTINGS_STATE);

	viewModel.players.removeAll();
	nextPlayerID = 1;

	for (var i = 0; i < viewModel.default_players(); i++) {
		addPlayer();
	}
}

function addPlayer() {
	viewModel.players.push(new Player(nextPlayerID++,(nextPlayerID ==2) ? viewModel.ais()[0] : viewModel.ais()[1]));
}

function removePlayer() {
	viewModel.players.pop();
	nextPlayerID--;
}

function startGame() {
	for (var i = 0; i < viewModel.players().length; i++) {
		var player = viewModel.players()[i];
		player.code = getCode(player.ai.id);
	}

	viewModel.game.state(PLAYING_STATE);
	viewModel.game.isPaused(false);
}

function pauseResumeGame() {
	viewModel.game.isPaused(!viewModel.game.isPaused());
}

function endGame() {
	viewModel.game.state(null);
}

function Player(id, ai) {
	this.id = id;
	this.ai = ai;

	this.score = ko.observable(0);
}

/**
 * This returns an object encapsulating the code for an entry
 */
function getCode(ai_name) {
	if (ai_name == "my_ai") {
		// The AI in the text box
		eval(viewModel.sampleCode());
	} else if (ai_name == "sample_ai") {
		// The sample AI
		eval(originalSampleCode);
	}
	return new Entry();
}

/**
 * This is used to abstract away function calls
 * This is to allow flexibility for adding different languages in future
 */
function message(target, subject, args) {
	target.code[subject].apply(null, args);
}