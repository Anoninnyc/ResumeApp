require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http')
var server = http.createServer(app)
var socketIO = require('socket.io').listen(5000);
var mongoose = require('mongoose');
var Email = require('./db/models.js');
var path = require('path');
var request = require("request");
var MongoClient = require('mongodb').MongoClient
mongoose.Promise = require('bluebird');
const io = socketIO.listen(server);
const cron = require('node-cron');


// db Connection
var URL = process.env.URL;

//old WAN "mongodb://heroku_sv2fwrvp:fir4oj2rvlj8ooh2qdb5i9tv1@ds033056.mlab.com:33056/heroku_sv2fwrvp"
//'mongodb://localhost:27017/mydatabase';
const pathToStaticDir = path.resolve(__dirname, '.', 'client/public');
mongoose.connect(URL);
////
//MiddleWare

app.use(express.static(__dirname + '/client'));

// Regex checker



var storyInfo = [];
const tSURL="https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";


cron.schedule('*/10 * * * *', function() {
  console.log('Running a task every one minute');
  request(tSURL, (error, response) => {
    storyInfo = [];
    const topStories = JSON.parse(response.body).slice(0, 5);
    console.log('got past first request!')
    topStories.forEach(storyId => {
      request(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`, (error, res) => {
        var body = JSON.parse(res.body);
        console.log('cronPushed')
        storyInfo.push([body.by, body.score, body.title, body.url]);

      })
    })
  })
});



//sockets
io.on('connection', function(socket) {
  socket.on('sendEmailAddress', function(msg) {
    
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
                console.log('thisshouldbehitalso!!!', storyInfo.length);

                if (storyInfo.length === 5) {
                  console.log('whatwewant!');
                  io.emit('loggedToDB', {
                    storyInfo,
                    companyInfo
                  });
                } else {
                  request(tSURL, (error, response) => {
                    const topStories = JSON.parse(response.body).slice(0, 5);
                    storyInfo = [];

                    topStories.forEach(storyId => {
                      request(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`, (error, res) => {
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
                }
              });
            });
          }
        })
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
