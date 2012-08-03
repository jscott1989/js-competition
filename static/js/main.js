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
viewModel.games = ko.observable(0);


ko.applyBindings(viewModel)


// Set up codemirror

// Bindings don't work so well with codeMirror so we have to do this
function codeChanged(change) {
	viewModel.sampleCode(change.getValue());
}

var codeMirror = CodeMirror.fromTextArea($('#code')[0], {"lineNumbers": true, "onChange": codeChanged});

// Basic controls
$('.competition-reset').live('click', function() {
	viewModel.sampleCode(originalSampleCode);
});

// Start a new game
$('.competition-play').live('click', function() {
	play();
});