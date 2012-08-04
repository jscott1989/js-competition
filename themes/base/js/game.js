var SETTINGS_STATE = "settings";
var PLAYING_STATE = "playing";

var nextPlayerID = 1;

function newGame() {
	viewModel.game({
		"state": SETTINGS_STATE
	});

	viewModel.players.removeAll();
	nextPlayerID = 1;

	addPlayer();
}

function addPlayer() {
	viewModel.players.push({"id": nextPlayerID++, "ai": (nextPlayerID ==2) ? viewModel.ais()[0] : viewModel.ais()[1]});
}

function removePlayer() {
	viewModel.players.pop();
	nextPlayerID--;
}