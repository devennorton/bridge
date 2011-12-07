var socket = io.connect(location.host);
console.log('got past connecting');
socket.on('player', function(player){
	console.log("got player message");
	console.log(player);
	for(i in player.hand){
		$(#hand).append('<div class="card"><div class="rank">' + 
			player.hand[i].rank + '</div><div class="suit">' + player.hand[i].suit + 
			'</div></div>');
		
	}
});