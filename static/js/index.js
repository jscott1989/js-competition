$(function() {
	$('.play').click(function() {
		$('#games').show();

		new_game();
		$.scrollTo('#games', 800);
	});
});