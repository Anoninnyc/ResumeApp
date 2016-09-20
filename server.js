var express = require('express');
var app = express();
var http = require('http')
var server = http.createServer(app);
var socketIO  = require('socket.io')
var mongoose = require('mongoose');
var Email = require('./db/models.js');
var path = require('path');
var request = require("request");
var MongoClient = require('mongodb').MongoClient
mongoose.Promise = require('bluebird');
const io = socketIO.listen(server);


// db Connection
var URL = "mongodb://heroku_tql53bj6:n7irdj440qghcr48jcp0aolip2@ds035766.mlab.com:35766/heroku_tql53bj6"

//old WAN "mongodb://heroku_sv2fwrvp:fir4oj2rvlj8ooh2qdb5i9tv1@ds033056.mlab.com:33056/heroku_sv2fwrvp"
//'mongodb://localhost:27017/mydatabase';
const pathToStaticDir = path.resolve(__dirname, '.', 'client/public');
mongoose.connect(URL);
////
//MiddleWare
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/public'));
app.use(express.static(__dirname + '/client/source'));
console.log('plieeeees');
// Regex checker
var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

//sockets
io.on('connection', function(socket) {
  socket.on('sendEmailAddress', function(msg) {
    console.log(msg, socket.id);




    if (reg.test(msg.address) && msg.name && msg.company) {

      var email = new Email();
      email.address = msg.address;
      email.name = msg.name;
      email.company = msg.company




      Email.findOne({
          $or: [{
            "address": msg.address
          }, {
            "name": msg.name
          }]
        }, 'address')
        .then(email => {
          console.log('here it is', email);
          return email !== null;
        }).then(exists => {
          console.log(exists, 'exists??')
          if (exists) {
            console.log('its there already!')
            io.emit('emailExtant', `emailExtant`)
          } else {
            const recentId = email.id;
            email.save(function(err, email) {
              const recentCompany = email.company;
              if (err)
                console.log(err);
              Email.findOne({
                "_id": {
                  '$ne': recentId
                },
                company: recentCompany
              }).then((entry, err) => {
                const companyInfo = !entry ? entry : [entry.company, entry.name];
                const storyInfo = [];
                request("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", (error, response, body)=> {
                  const topStories = JSON.parse(response.body).slice(0, 5);

                  topStories.forEach(storyId => {
                    request(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`, (error, res, body)=> {
                      var body = JSON.parse(res.body);
                      storyInfo.push([body.by, body.score, body.title, body.url]);
                      if (storyInfo.length === 5) {
                        io.emit('loggedToDB', {
                          storyInfo,
                          companyInfo
                        });
                      }
                    })
                  })
                })
              });
            });
          }
        })
    } else if (!reg.test(msg.address)) {
      io.emit('invalidEmail');
    } else if (!msg.name){
       io.emit('invalidName')
    } else if (!msg.company){
       io.emit('invalidCompany')
    } 

  });
});

// routes
app.get('*', (req, res) => {
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});


// Cant use app here b/c it interferes w/ sockets.
server.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port');
});
