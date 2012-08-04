var viewModel = new (function() {
	var self = this;
	{% for k in config %}
		self["{{loop.key}}"] = ko.observable("{{k}}");
	{% endfor %}
});

function viewModelLoaded() {
	ko.applyBindings(viewModel)
}