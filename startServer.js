var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/chatbox', function(req, res){
  res.sendFile(__dirname + '/chatbox.html');
})

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

  io.emit('users online', users);
  
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
	let message = {};
	message.time = getCurrentDate();
	message.user = nickname;
	message.body = msg;
	message.system = false;
	io.emit('chat message', message);
    if(messages.length >= MAX_MESSAGES){
    	messages.shift();
    }
    messages.push(message);
}

function sendMessageNoName(io, msg){
	let message = {};
	message.time = getCurrentDate();
	message.user = 'System';
	message.body = msg;
	message.system = true;
	io.emit('chat message', message);
    if(messages.length >= MAX_MESSAGES){
    	messages.shift();
    }
    messages.push(message);
}

function sendMessageToUser(socket, msg){
	let message = {};
	message.time = getCurrentDate();
	message.user = 'System';
	message.body = msg;
	message.system = true;
	console.log('entra');
	socket.emit('chat message', message);
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
	return hh + ':' + min;
}