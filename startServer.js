var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Resources
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));


var users = [];
var messages = [];
var sockets = [];
const MAX_MESSAGES = 20;
io.on('connection', function(socket){
  console.log('Nueva conexión: ' + socket.id);
  let nickname = socket.handshake.query.nickname;
  nickname = (nickname == undefined || nickname == 'null' ? 'Anonymous' : nickname);
  let user = {};
  user.id = socket.id;
  console.log(nickname);
  user.nickname = nickname;
  // user.socket = socket;
  sockets.push(socket);
  users.push(user);

  sendMessageNoName(io, nickname + ' se ha conectado.');

  io.emit('users online', users);

  socket.emit('last messages', messages);

  // Al recibir un mensaje
  socket.on('chat message', function(msg){
    sendMessage(io, nickname, msg);
  });

  // Informar que no existe el comando
  socket.on('no command', function(msg){
  	sendMessageToUser(socket, msg);
  });

  // Desconexión del usuario
  socket.on('disconnect', function(){
  	users = users.filter(user => user.id != socket.id);
  	io.emit('users online', users);
  	sendMessageNoName(io, nickname + ' se ha desconectado.');
    console.log(socket.id + ' se ha desconectado.');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function sendMessage(io, nickname, msg){
	msg = getCurrentDate() +' <b>' + nickname + ':</b> ' + msg
	io.emit('chat message', msg);
    if(messages.length >= MAX_MESSAGES){
    	messages.shift();
    }
    messages.push(msg);
}

function sendMessageNoName(io, msg){
	msg = getCurrentDate() + ' <b><i>' + msg + '</i></b>';
	io.emit('chat message', msg);
    if(messages.length >= MAX_MESSAGES){
    	messages.shift();
    }
    messages.push(msg);
}

function sendMessageToUser(socket, msg){
	msg = getCurrentDate() + ' <b><i>' + msg + '</i></b>';
	socket.emit('chat message', msg);
}

function getCurrentDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var hh = today.getHours();
	var min = today.getMinutes();

	var yyyy = today.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	} 
	if (mm < 10) {
	  mm = '0' + mm;
	} 
	if (hh < 10) {
	  hh = '0' + hh;
	} 
	if (min < 10) {
	  min = '0' + min;
	}
	// Full date: '[' +dd + '/' + mm + '/' + yyyy + ' - ' + today.getHours() + ':' + today.getMinutes() + ']'
	return '[' + hh + ':' + min + ']';
}