(function() {
  events.on('initViewModel', function(v) {
  	v.game.events = ko.observableArray();
  });

  events.on('log', function(l) {
  	v.game.events.push({'text': l});
  });
})();