//Deck Class
Deck = function(params) {
	var _cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
	this.deal = function(n){
		if (n > _cards.length) return null;
		var hand = [];
		for(var i = 0; i < n; i++){
			hand.push(_cards.splice(Math.floor(Math.random() * _cards.length), 1)[0]);
		}
		return hand.sort(function(a, b){ return b - a;});
	}
}
