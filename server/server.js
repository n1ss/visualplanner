var cluster = require('cluster')
  // , redis = require("socket.io/node_modules/redis")
  , numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} else {
  // Module dependencies
  var io = require('socket.io')
    , express = require('express')
    , passport = require('passport')
    , mongoose = require('mongoose')
    , fs = require('fs');

  var app = express();

  // Load configurations
  var env = process.env.NODE_ENV || 'dev'
    , config = require('./config/config')[env]
    , auth = require('./authorization');

  // Load redis store
  // var RedisStore = require('socket.io/lib/stores/redis')
  //   , pub = redis.createClient()
  //   , sub = redis.createClient()
  //   , client = redis.createClient();

  // Bootstrap mongoDB connection
  mongoose.connect(config.db);

  // Bootstrap models
  var modelsPath = __dirname + '/app/Models'
    , modelFiles = fs.readdirSync(modelsPath);

  modelFiles.forEach(function(file) {
    require(modelsPath + '/' + file);
  });

  // Bootstrap passport config
  require('./config/passport').boot(passport, config)

  require('./bootstrap').boot(app, config, passport);
  require('./config/routes')(app, passport, auth);

  // Start server
  var server = app.listen(config.port);

  // Start soket.io
  // var sio = io.listen(server, {
  //   'store': new RedisStore({
  //       redisPub: pub,
  //       redisSub: sub,
  //       redisClient: client
  //   })
  // });
}