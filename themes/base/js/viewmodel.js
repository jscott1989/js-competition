var viewModel = new (function() {
	var self = this;
	{% for k in config %}
		self["{{loop.key}}"] = ko.observable("{{k}}");
	{% endfor %}

	self.players = ko.observableArray();
	
	self.ais = ko.observableArray([
		{"id": "my_ai", "name": "My AI"},
		{"id": "sample_ai", "name": "Sample AI"}
	]);
})();

function viewModelLoaded() {
	ko.applyBindings(viewModel);
}