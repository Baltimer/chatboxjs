var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


var users = [];
io.on('connection', function(socket){
  console.log('Nueva conexión: ' + socket.id);
  users.push(socket.id);
  console.log(users);

  // Al recibir un mensaje
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  // Establecer nombre de usuario
  socket.on('set username', function(username){
  	
  });
  // Desconexión del usuario
  socket.on('disconnect', function(){
    users.splice(users.indexOf(socket.id), 1);
    console.log(socket.id + ' se ha desconectado.');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});