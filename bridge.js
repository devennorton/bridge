
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , socketio = require('socket.io');

var app = module.exports = express.createServer();
var io = socketio.listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// Routes
console.log(routes.game);

app.get('/', routes.index);

app.get('/game/', routes.game);

var players = {}

// socket.io

io.sockets.on('connection', function (socket) {
	var deck = new Deck();
	socket.join('game');
	console.log(socket.id);
	
	var next = 1;
	
	switch(next) {
		case 1:
			players.north = new Player({position : 'North', hand : deck.deal(13), socket: socket}); 
			socket.emit('player', players[0].player);
			break;
		case 2:
			players.south = new Player({position : 'South', hand : deck.deal(13), socket: socket}); 
			socket.emit('player', players[1].player);
			break;
		case 3:
			players.east = new Player({position : 'East', hand : deck.deal(13), socket: socket}); 
			socket.emit('player', players[2].player);
			break;
		case 4:
			players.west = new Player({position : 'West', hand : deck.deal(13), socket: socket}); 
			socket.emit('player', players[3].player);
			break;
		default:
			socket.emit('specator', {north: players.north.hand, south: players.south.hand, east: players.east.hand, west: players.west.hand});
			break;
	}
});

//Player Class
Player = function(params) {
	var _position = params.position;
	var _hand = params.hand;
	var _played = [];
	var _bids = null;
	this.socket = params.socket;
	
	Object.defineProperties( this, {
		position: {
			get: function(){ return _position }
		},
		hand: {
			get: function(){ return _hand }
		}
	});
	this.play = function(v, s){
		var i = _hand.indexOf({suit: s, val: v});
		if (i >= 0){
			_played.concat(_hand.splice(i, 1));
		}
	}
}

//Deck Class
Deck = function(params) {
	var _cards = [];
	for (i in CARDS.SUITS){
		for (j in CARDS.VALUES){
			_cards.push({suit: CARDS.SUITS[i], val: CARDS.VALUES[j]});
		}
	}
	this.deal = function(n){
		if (n > _cards.length) return null;
		var hand = [];
		for(var i = 0; i < n; i++){
			hand.push(_cards.splice(Math.random() * _cards.length, 1);
		}
		return hand;
	}
}

//
var CARDS = {
	SUITS: [ 'C', 'D', 'H', 'S' ],
	VALUES: [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]
}
