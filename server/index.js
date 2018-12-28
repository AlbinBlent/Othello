var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var players = new Map();

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

function connection(socket) {
  const handshakeData = socket.request;
  const name = JSON.parse(handshakeData._query['name']);
  console.log('a user connected: ' + name);
  players.set(socket.id, {name: name, id: socket.id});
  players.forEach((value, key) => {
    console.log(value.name + ' ' + key)
  });

  socket.emit('currentPlayers', Array.from(players.values()))
  socket.broadcast.emit('newPlayer', players.get(socket.id))
  
  socket.on('disconnect', function(){
    console.log('user disconnected ' + name);
    players.delete(socket.id);
    players.forEach((value, key) => {
      console.log(value.name + ' ' + key)
    });
  })
}

io.on('connection', connection);

http.listen(3001, function(){
  console.log('listening on *:3001');
});