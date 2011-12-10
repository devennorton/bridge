
/**
 * Module dependencies.
 */

 require('public/javascripts/Player.js');
 require('public/javascripts/Deck.js');
 
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

var players = {}, next = 1, deck = new Deck();

// socket.io

io.sockets.on('connection', function (socket) {
	socket.join('game');
	console.log(socket.id);
		
	switch(next) {
		case 1:
			players.north = new Player({position : 'North', hand : deck.deal(13), socket: socket}); 
			console.log("connection number" + next);
			socket.json.emit('player', {position: players.north.position, hand: players.north.hand});
			next++;
			break;
		case 2:
			players.south = new Player({position : 'South', hand : deck.deal(13), socket: socket}); 
			console.log("connection number" + next);
			socket.emit('player', {position: players.south.position, hand: players.south.hand});
			next++;
			break;
		case 3:
			players.east = new Player({position : 'East', hand : deck.deal(13), socket: socket}); 
			console.log("connection number" + next);
			socket.emit('player', {position: players.east.position, hand: players.east.hand});
			next++;
			break;
		case 4:
			players.west = new Player({position : 'West', hand : deck.deal(13), socket: socket}); 
			console.log("connection number" + next);
			socket.emit('player', {position: players.east.position, hand: players.east.hand});
			next++;
			break;
		default:
			console.log("connection number" + next);
			socket.emit('specator', {north: players.north.hand, south: players.south.hand, east: players.east.hand, west: players.west.hand});
			break;
	}
});


//all the cards (a convenient constant)
var CARDS = {
	SUITS: [ '♣', '♦', '♥', '♠' ],
	VALUES: [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A' ]
}
