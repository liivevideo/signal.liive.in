// Generated by CoffeeScript 1.10.0
(function() {
  var Handshake, RTCChannel, Room;

  RTCChannel = require('../lib/RTCChannel');

  Handshake = require('../lib/Handshake');

  Room = (function() {
    var channel, didConnect, didExchange, didLeave, exchangeCandidate, exchangeDescription, handshake;

    handshake = null;

    channel = null;

    function Room(configuration, _observers) {
      channel = new RTCChannel(configuration, _observers, {
        exchangeDescription: exchangeDescription,
        exchangeCandidate: exchangeCandidate
      });
      handshake = new Handshake(configuration, {
        didConnect: didConnect,
        didExchange: didExchange,
        didLeave: didLeave
      });
      return;
    }

    Room.prototype.join = function(roomId, callback) {
      handshake.join(roomId, function(error, ids) {
        var i, id, len;
        console.log('Room:: join', JSON.stringify(ids));
        for (i = 0, len = ids.length; i < len; i++) {
          id = ids[i];
          channel.createListener(id, true);
        }
        if (callback != null) {
          return callback(null, ids);
        }
      });
    };

    Room.prototype.leave = function(roomId, callback) {
      handshake.leave(roomId, callback);
    };

    Room.prototype.say = function(text) {
      channel.send(text);
    };

    exchangeDescription = function(id, description) {
      console.log('Room::id:' + id + ' description', description);
      if (id !== null) {
        handshake.description(id, description);
      }
    };

    exchangeCandidate = function(id, candidate) {
      console.log('Room::id:' + id + ' candidate', candidate);
      if (id !== null) {
        handshake.candidate(id, candidate);
      }
    };

    didConnect = function() {
      console.log('Room:: Did Connect, call get Media');
      channel.getMedia({
        "audio": true,
        "video": true
      }, function(stream) {
        return console.log("Room:: did Connect end: " + stream);
      });
    };

    didExchange = function(data) {
      console.log("Room:: did Exchange");
      channel.exchange(data);
    };

    didLeave = function(id) {
      console.log("Room:: did Leave, delete listener.");
      channel.deleteListener(id, function(error, id) {
        return console.log("Handshake:: did Leave: " + id);
      });
    };

    return Room;

  })();

  module.exports = Room;

}).call(this);

//# sourceMappingURL=Room.js.map
