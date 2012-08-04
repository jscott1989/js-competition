var originalSampleCode = $('#code').text();

// Set up a viewModel for storing the sample code
if (localStorage && 'code' in localStorage) {
	viewModel.sampleCode = ko.observable(localStorage['code'])
} else {
	viewModel.sampleCode = ko.observable(originalSampleCode);
}

// Record the changes into localstorage
viewModel.sampleCode.subscribe(function(newValue) {
	if (localStorage) {
		localStorage['code'] = newValue;
	}
	if (codeMirror.getValue() != newValue) {
		// Manually bind codeMirror
		codeMirror.setValue(newValue)
	}
});



// The number of games on the page
viewModel.game = ko.observable(null);


viewModelLoaded();


// Set up codemirror

// Bindings don't work so well with codeMirror so we have to do this
function codeChanged(change) {
	viewModel.sampleCode(change.getValue());
}

var codeMirror = CodeMirror.fromTextArea($('#code')[0], {"lineNumbers": true, "onChange": codeChanged});

// Basic controls
$('.competition-reset').live('click', function() {
	viewModel.sampleCode(originalSampleCode);
	return false;
});

// Start a new game
$('.competition-new-game').live('click', function() {
	newGame();
	return false;
});

// Add a player
$('.competition-add-player').live('click', function() {
	addPlayer();
	return false;
});

// Remove a player
$('.competition-remove-player').live('click', function() {
	removePlayer();
	return false;
});