require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http')
var cors = require('cors');
var server = http.createServer(app);
var socketIO = require('socket.io')
var mongoose = require('mongoose');
var Email = require('./db/models.js');
var path = require('path');
var request = require("request");
var MongoClient = require('mongodb').MongoClient
mongoose.Promise = require('bluebird');
const io = socketIO.listen(server);
const cron = require('node-cron');

//
// db Connection
//
var URL = process.env.URL || 'mongodb://localhost:27017/mydatabase';


MongoClient.connect(URL, function (err, db) {
    if (err) {
        URL='mongodb://localhost:27017/mydatabase';
    } else {
        URL=process.env.URL;
    }
    db.close();
});


const pathToStaticDir = path.resolve(__dirname, '.', 'client/public');
mongoose.connect(URL);
////
//MiddleWare
app.use(cors());
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
        storyInfo.push([body.by, body.score, body.title, body.url, toDateTime(body.time)]);

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
      email.company = msg.company;
      email.comment= msg.comment;

      console.log("************************HERE IS EMAIL",email, msg);
      Email.findOne({
          $or: [{
            "address": msg.address
          }, {
            "name": msg.name
          }]
        }, 'address')
        .then(email => {
          return email !== null;
        }).then(exists => {
          if (exists) {
            io.emit('emailExtant', `emailExtant`);
          } else {
            const recentId = email.id;
            email.save((err, email)=> {
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
                if (storyInfo.length === 5) {
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
                        storyInfo.push([body.by, body.score, body.title, body.url, toDateTime(body.time)]);
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


app.get('/test', (req, res) => {
  console.log("**********************************************************************************")
});


app.get('*', (req, res) => {
  const pathToIndex = path.join(pathToStaticDir, 'index.html');
  res.status(200).sendFile(pathToIndex);
});


server.listen(process.env.PORT || 3000, () => {
  console.log(process.env.PORT)
  console.log('Listening on port');
});



function toDateTime(secs) {
  var t = new Date(1970, 0, 1); 
  t.setSeconds(secs);
  var string=t.toISOString()
  return string.slice(0,string.indexOf("T"))
}