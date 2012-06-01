$(function() {
	$('.play').click(function() {
		$('#games').show();

		start_game();
		$.scrollTo('#games', 800);
	});
});