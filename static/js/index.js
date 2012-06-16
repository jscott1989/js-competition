/* Just setup the play buttons on the index to call into the main competition engine */
$(function() {
	$('.play').click(function() {
		$('#games').show();

		new_game();
		$.scrollTo('#games', 800);
	});
});