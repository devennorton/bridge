//Player Class
Player = function(params) {
	var _position = params.position;
	var _hand = params.hand;
	var _played = [];
	var _bids = [];
	this.socket = params.socket;
	
	Object.defineProperties( this, {
		position: {
			get: function(){ return _position }
		},
		hand: {
			get: function(){ return _hand }
		}
	});
	this.play = function(card){
		var i = _hand.indexOf(card);
		if (i >= 0){
			_played.append(_hand.splice(i, 1));
		}
	}
}