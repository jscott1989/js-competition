var gamerunner = {
	initViewModel: function() {
		// If possible, games should use the viewModel.game to store game data - this is so it can then be bound on the interface
		// This function is used to setup the viewmodel with data that will be filled in later
		viewModel.game.orderedPlayers = ko.computed(function() {
			// Copy players - so we don't sort the original list
			var players = viewModel.players().slice(0);

			players.sort(function(p1, p2) {
				return p2.score() - p1.score();
			});

			return players;
		});
	},

	next_turn: function(player) {
		message(player, 'take_turn');
	}
};