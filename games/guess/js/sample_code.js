function Entry() {
	this.take_turn = function(){
		// Just return a random number between 1 and 10
		return Math.floor(Math.random()*10)+1;
	};
}