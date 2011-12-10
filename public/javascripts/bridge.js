require('Player.js')

var CARDS = {
	SUITS: [ '♣', '♦', '♥', '♠' ],
	VALUES: [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]
};

var socket = io.connect(location.host);
console.log('got past connecting');

$( function(){
	var game = new Game();
	socket.on('player', function(player){
		console.log("got player message");
		console.log(player);
		drawhand(player.hand, '#hand');
	});
	socket.on('spectator', function(hands){
		
	});
	socket.on('bid', function(bid){
		
	});
	socket.on('play', function(play){
		
	});
	socket.on('dummy', function(dummy){
		
	});
});

var BiddingBox = function(){
	this.bid = function(val){
		
	}
}

var Game = function(){
	var _biddingBox = new BiddingBox();
	var _players = {}, _position
	
	this.addPlayer = function(player){
		_position = player.position;
		_players[player.position] = new Player(player)
	}
}

function drawHand(hand, locator){
	for(i in hand){
		var redsuit = '';
		var suit =  Math.floor(hand[i] / 13), rank = hand[i] % 13;
		if(suit == 1 || suit == 2)
			redsuit = ' redsuit';
		
		$(locator).append('<div id="' + hand[i] + '" class="card' + redsuit + '"><div class="rank">' + 
			CARDS.VALUES[rank]  + '</div><div class="suit">' + CARDS.SUITS[suit] + 
			'</div></div>');
		
	}
}