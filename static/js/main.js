var games = 0;

function start_game() {
	games += 1
	var game = $($("#gameTemplate").render({"game_no": games}));
	$('#games .accordion').append(game);
	var game_container = game.find('.accordion-inner');
	run_game(game_container);
	game.find('.accordion-toggle').click();
}

function run_game(game_container) {
	var setting_players = game_container.find('.players');
	for (var i = 1; i <= config.players; i++) {
		var player_config = $($("#playerSettingTemplate").render({"player_no": i}));
		setting_players.append(player_config);
	}
}