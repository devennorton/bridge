var CARDS = {
	SUITS: [ '♣', '♦', '♥', '♠' ],
	VALUES: [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]
};

var socket = io.connect(location.host);
console.log('got past connecting');

$( function(){
	socket.on('player', function(player){
		console.log("got player message");
		console.log(player);
		for(i in player.hand){
			var redsuit = '';
			var suit =  math.floor(player.hand[i] / 13), rank = player.hand[i] % 13);
			if(suit == 1 || suit == 2)
				redsuit = ' redsuit';
			
			$('#hand').append('<div id="' + player.hand[i] + '" class="card' + redsuit + '"><div class="rank">' + 
				CARDS.VALUES[rank]  + '</div><div class="suit">' + CARDS.SUITS[suit] + 
				'</div></div>');
			
		}
	});
	socket.on('bid', function(bid){
		
	});
	socket.on('play', function(play){
		
	});
	socket.on('dummy', function(dummy){
		
	});
});