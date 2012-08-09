var base_gamerunner = {
	initViewModel: function() {
		viewModel.game.turn = ko.observable(1);

		viewModel.game.state.subscribe(function(newValue) {
			if (newValue == PLAYING_STATE) {
				base_gamerunner.start();
			}
		});

		viewModel.game.current_player = ko.observable(null);
	},

	start: function() {
		viewModel.game.current_player(viewModel.players()[0])
		gamerunner.next_turn(viewModel.game.current_player());
	}
};