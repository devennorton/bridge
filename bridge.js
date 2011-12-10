
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

app.get('/game', routes.game);


//all the cards (a convenient constant)
var CARDS = {
	SUITS: [ '♣', '♦', '♥', '♠' ],
	VALUES: [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]
}

//Deck Class
var Deck = function(params) {
	var _cards = [ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 
								13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 
								26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 
								39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
	this.deal = function(n){
		if (n > _cards.length) return null;
		var hand = [];
		for(var i = 0; i < n; i++){
			hand.push(_cards.splice(Math.floor(Math.random() * _cards.length), 1)[0]);
		}
		return hand.sort(function(a, b){ return b - a;});
	}
}

//Player Class
var Player = function(params) {
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

var players = {}, next = 1, deck = new Deck();

// socket.io

io.sockets.on('connection', function (socket) {
	socket.join('game');
	console.log(socket.id);
		
	switch(next) {
		case 1:
			players.north = new Player({position : 'North', hand : deck.deal(13), socket: socket}); 
			console.log("connection number" + next);
			socket.json.emit('player', {position: players.north.position, hand: players.north.hand, dealer: 'north'});
			next++;
			break;
		case 2:
			players.south = new Player({position : 'South', hand : deck.deal(13), socket: socket}); 
			console.log("connection number" + next);
			socket.emit('player', {position: players.south.position, hand: players.south.hand, dealer: 'north'});
			next++;
			break;
		case 3:
			players.east = new Player({position : 'East', hand : deck.deal(13), socket: socket}); 
			console.log("connection number" + next);
			socket.emit('player', {position: players.east.position, hand: players.east.hand, dealer: 'north'});
			next++;
			break;
		case 4:
			players.west = new Player({position : 'West', hand : deck.deal(13), socket: socket}); 
			console.log("connection number" + next);
			socket.emit('player', {position: players.east.position, hand: players.east.hand, dealer: 'north'});
			next++;
			break;
		default:
			console.log("connection number" + next);
			socket.emit('specator', {north: players.north.hand, south: players.south.hand, east: players.east.hand, west: players.west.hand, dealer: 'north'});
			break;
	}
});


