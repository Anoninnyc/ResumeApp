var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/public'));
app.use(express.static(__dirname + '/client/source'));


io.on('connection', function(socket){
  socket.on('sendEmailAddress', function(msg){
    console.log(msg,socket.id;)
  });
});

// cant use app here b/c it interferes w/ sockets.
http.listen(3000, "127.0.0.1");

