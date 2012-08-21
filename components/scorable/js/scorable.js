(function() {
  events.on("initViewModel", function(v) {
  	v.game.orderedPlayers = ko.computed(function() {
  		// Copy players - so we don't sort the original list
  		var players = v.game.players().slice(0);

  		players.sort(function(p1, p2) {
  			return p2.score() - p1.score();
  		});

  		return players;
  	});
  });

  events.on("initPlayer", function(player) {
  	player.score = ko.observable(0);
  });
})();