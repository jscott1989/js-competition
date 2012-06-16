jQuery.fn.serializeObject = function() {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null) {
      value = this.value;
    } else {
      value = '';
    }

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });

  return objectData;
};


var games = 0;

/**
 * Start a new game
 */
function new_game() {
	games += 1
	var game = $($("#gameTemplate").render({"game_no": games}));
	$('#games .accordion').append(game);
	var game_container = game.find('.accordion-inner');
	run_settings(game_container);
	game.find('.accordion-toggle').click();
}

/**
 * Setup the settings menu for a game
 */
function run_settings(game_container) {
	var setting_players = game_container.find('.players');
	for (var i = 1; i <= config.players; i++) {
		var player_config = $($("#playerSettingTemplate").render({"player_no": i}));
		setting_players.append(player_config);
	}
}

/**
 * Submit the settings
 */
$('.settings form').live('submit', function() {
	var form = $(this);
	var formData = form.serializeObject();
	var settings = form.closest('.settings');
	var game_container = settings.closest('.accordion-inner');

	settings.fadeOut(200, function() {
		$(this).remove();

		// TODO: Load settings into game
		setup_game(game_container);
	});

	return false;
});

/**
 * Set up the game environment
 */
function setup_game(game_container) {
	game_container.closest('.accordion-group').addClass('in-progress');

	run_gamerunner.call(game_container);
	$(game_container).trigger('setup_game');
}