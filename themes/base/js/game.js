var SETTINGS_STATE = "settings";
var PLAYING_STATE = "playing";

function newGame() {
	viewModel.game({
		"state": SETTINGS_STATE
	});
}