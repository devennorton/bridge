var socket = io.connect(location.host);
console.log('got past connecting');

$( function(){
	socket.on('player', function(player){
		console.log("got player message");
		console.log(player);
		for(i in player.hand){
			var redsuit = '';
			
			if(player.hand[i].suit == '♦' || player.hand.suit == '♥')
				redsuit = ' redsuit';
			
			$('#hand').append('<div class="card' + redsuit + '"><div class="rank">' + 
				player.hand[i].val + '</div><div class="suit">' + player.hand[i].suit + 
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