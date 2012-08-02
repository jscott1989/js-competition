var originalSampleCode = $('#code').text();

// Set up a viewModel for storing the sample code
var viewModel = new (function() {
	var self = this;

	if (localStorage && 'code' in localStorage) {
		self.sampleCode = ko.observable(localStorage['code'])
	} else {
		self.sampleCode = ko.observable(originalSampleCode);
	}
})();

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

ko.applyBindings(viewModel)


// Set up codemirror

// Bindings don't work so well with codeMirror so we have to do this
function codeChanged(change) {
	viewModel.sampleCode(change.getValue());
}

var codeMirror = CodeMirror.fromTextArea($('#code')[0], {"lineNumbers": true, "onChange": codeChanged});


// Basic controls
$('.competition-reset').live('click', function() {
	console.log("A");
	viewModel.sampleCode(originalSampleCode);
})