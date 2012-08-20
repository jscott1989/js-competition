var gamerunner = {
	initViewModel: function() {
		// If possible, games should use the viewModel.game to store game data - this is so it can then be bound on the interface
		// This function is used to setup the viewmodel with data that will be filled in later
		v.game.randomNumber = ko.observable(0);
	}

	start: function() {
		viewModel.game.randomNumber(Math.floor(Math.random()*10)+1);
		addEvent("Number is " + viewModel.game.randomNumber());
	},

	nextTurn: function(player) {
		var guess = player.code.take_turn();
		addEvent(player.id + " guessed " + guess);
		if (guess == viewModel.game.randomNumber()) {
			player.score(player.score() + 1);
		}
	}
};