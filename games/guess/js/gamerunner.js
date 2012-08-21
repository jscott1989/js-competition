(function() {
	events.on("initViewModel", function(v) {
		v.game.randomNumber = ko.observable(0);
	});

	events.on("start", function(v) {
		v.game.randomNumber(Math.floor(Math.random()*10)+1);
		events.emit("log", "Number is " + v.game.randomNumber());
	});

	events.on("next_turn", function(player) {
		// var guess = player.code.take_turn();
		// addEvent(player.id + " guessed " + guess);
		// if (guess == v.game.randomNumber()) {
		// 	player.score(player.score() + 1);
		// }
	});
})();