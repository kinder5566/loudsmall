require('babel-core/register'); //enables ES6 ('import'.. etc) in Node
var path = require('path');
global.__base = path.join(__dirname, '..', '..');
global.__server = __dirname;
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.set('port', process.env.PORT || 8008);

// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Webpack
var webpack = require('webpack');
var config = require(path.join(__base, 'webpack.config.dev'));
var compiler = webpack(config);
compiler.apply(new webpack.ProgressPlugin());

app.use(require('webpack-dev-middleware')(compiler, {
  hot: true,
  inline: true,
  stats: { colors: true },
  historyApiFallback: true,
  progress: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__base, 'src', 'client', 'index.html'));
});

// RESTful API
path.join(__dirname, 'routes', 'v1', 'index')
var apiV1noToken = require(path.join(__dirname, 'routes', 'v1', 'notoken', 'index'));
var apiV1 = require(path.join(__dirname, 'routes', 'v1', 'index'));
app.use('/api/v1', apiV1noToken);
app.use('/api/v1', apiV1);

var http = require('http').Server(app);
// Socket.IO
require(__server + '/socket/socketIO').init(http);

http.listen(app.get('port'), function(err){
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:8008');
});

process.on('uncaughtException', function(err) {
  console.error(err); 
});

