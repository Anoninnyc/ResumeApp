var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose= require('mongoose');
var Email= require('./models.js');
mongoose.Promise = require('bluebird');
//assert.equal(query.exec().constructor, require('bluebird'));

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/public'));
app.use(express.static(__dirname + '/client/source'));


var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://localhost:27017/mydatabase'



mongoose.connect(URL);


io.on('connection', function(socket){
  socket.on('sendEmailAddress', function(msg){
    console.log(msg,socket.id);

    var email = new Email();
    email.address=msg;

     email.save(function(err) {
            if (err)
                console.log(err);

io.emit('chat message', `email added ${msg}`);
           
        });



  });
});

// Cant use app here b/c it interferes w/ sockets.
http.listen(3000, "127.0.0.1");



//   MongoClient.connect(URL, function(err, db) {
//   if (err) return

//   var emails = db.collection('emails');

//   emails.insert({address: msg}, function(err, result) {
//     emails.find({address: msg}).toArray(function(err, docs) {
//       console.log(docs[0])
//       db.close()
//     })
//   })
// })