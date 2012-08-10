var base_gamerunner = {
	initViewModel: function() {
		viewModel.game.turn = ko.observable(1);

		viewModel.game.state.subscribe(function(newValue) {
			if (newValue == PLAYING_STATE) {
				base_gamerunner.start();
			}
		});

		viewModel.game.current_player = ko.observable(0);
	},

	start: function() {
		viewModel.game.current_player(0);
		base_gamerunner.next_turn();
	},

	next_turn: function() {
		gamerunner.next_turn(viewModel.players()[viewModel.game.current_player()]);

		viewModel.game.current_player(viewModel.game.current_player() + 1);
		if (viewModel.game.current_player() >= viewModel.players().length) {
			viewModel.game.turn(viewModel.game.turn()+1);
			viewModel.game.current_player(0);
		}

		if (viewModel.game.turn() < 100) {
			setTimeout(base_gamerunner.next_turn, 500);
		}
	}
};