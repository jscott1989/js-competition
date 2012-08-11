var base_gamerunner = {
	initViewModel: function() {
		viewModel.game.turn = ko.observable(1);

		viewModel.game.state.subscribe(function(newValue) {
			if (newValue == PLAYING_STATE) {
				base_gamerunner.start();
			}
		});

		viewModel.game.current_player = ko.observable(0);

		viewModel.game.isFinished = ko.computed(function() {
			if (viewModel.game.turn() >= viewModel.max_turns()) {
				return true;
			}

			for(var i = 0; i < viewModel.players().length; i++) {
				if (viewModel.players()[i].score() >= viewModel.max_score()) {
					return true;
				}
			}
			return false;
		});
	},

	start: function() {
		viewModel.game.current_player(0);
		base_gamerunner.next_turn();
	},

	next_turn: function() {
		console.log('next turn');
		gamerunner.next_turn(viewModel.players()[viewModel.game.current_player()]);

		viewModel.game.current_player(viewModel.game.current_player() + 1);
		if (viewModel.game.current_player() >= viewModel.players().length) {
			viewModel.game.turn(viewModel.game.turn()+1);
			viewModel.game.current_player(0);
		}

		if (viewModel.game.isFinished()) {
			// The game is over
			alert('FINSIHED');
		} else {
			setTimeout(base_gamerunner.next_turn, 200);
		}
	}
};