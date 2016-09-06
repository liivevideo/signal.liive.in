// Generated by CoffeeScript 1.10.0
(function() {
  var app, express, fs, http, https, io, open, options, path, roomList, serverHttp, serverHttps, serverPortHttp, serverPortHttps, socketIdsInRoom;

  express = require('express');

  app = express();

  fs = require('fs');

  open = require('open');

  path = require('path');

  options = {
    key: fs.readFileSync('/etc/letsencrypt/live/liive.io/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/liive.io/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/liive.io/chain.pem'),
    requestCert: false,
    rejectUnauthorized: false
  };

  serverPortHttps = process.env.PORT || 8443;

  serverPortHttp = 8080;

  https = require('https');

  http = require('http');

  serverHttps = https.createServer(options, app);

  serverHttp = http.createServer(app);

  io = require('socket.io')(serverHttps);

  roomList = {};

  socketIdsInRoom = function(name) {
    var collection, key, socketIds;
    console.log("ids in room..." + name);
    socketIds = io.nsps['/'].adapter.rooms[name];
    console.log("sockets:" + JSON.stringify(socketIds));
    if (socketIds) {
      collection = [];
      for (key in socketIds) {
        collection.push(key);
      }
      console.log("ids: " + JSON.stringify(collection));
      return collection;
    } else {
      return [];
    }
  };

  io.on('connection', function(socket) {
    console.log('connection');
    socket.on('disconnect', function() {
      var room;
      console.log('disconnect');
      if (socket.room) {
        room = socket.room;
        io.to(room).emit('leave', socket.id);
        socket.leave(room);
      }
    });
    socket.on('join', function(name, callback) {
      var socketIds;
      console.log('join', name);
      socketIds = socketIdsInRoom(name);
      callback(socketIds);
      socket.join(name);
      socket.room = name;
    });
    return socket.on('exchange', function(data) {
      var to;
      console.log('exchange', data);
      data.from = socket.id;
      to = io.sockets.connected[data.to];
      to.emit('exchange', data);
    });
  });

  app.use('/.well-known', express["static"](path.join(__dirname, '.well-known')));

  app.use('/', express["static"](path.join(__dirname, 'public')));

  serverHttps.listen(serverPortHttps, function() {
    console.log('server up and running at %s port', serverPortHttps);
    if (process.env.LOCAL) {
      open('https://liive.io');
    }
  });

  serverHttp.listen(serverPortHttp, function() {
    console.log('server up and running at %s port', serverPortHttp);
  });

}).call(this);

//# sourceMappingURL=app.js.map
