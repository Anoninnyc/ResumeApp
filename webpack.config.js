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
//   module: {
//   loaders: [
//     {
//       test: /\.js$/,
//       exclude: /(node_modules|bower_components)/,
//       loader: 'babel',
//       query: {
//         presets: ['es2015']
//       }
//     }
//   ]
// }
}

module.exports = config;
