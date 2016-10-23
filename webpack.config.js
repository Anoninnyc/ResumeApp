var webpack = require('webpack');
var config = {
  context: __dirname + '/client',

  entry: {
    app: './app.js'
  },
  output: {
    path: __dirname + '/client',
    filename: 'bundle.js'
  },
}

module.exports = config;
