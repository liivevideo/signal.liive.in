// Generated by CoffeeScript 1.10.0
(function() {
  var Handshake;

  Handshake = (function() {
    var _connect, _exchange, _leave, reactions, socket;

    socket = null;

    reactions = null;

    function Handshake(configuration, _reactions) {
      var io, signalServer;
      io = configuration.io;
      signalServer = configuration.signalServer;
      socket = io(signalServer);
      reactions = _reactions;
      socket.on('connect', _connect);
      socket.on('exchange', _exchange);
      socket.on('leave', _leave);
    }

    Handshake.prototype.join = function(id, callback) {
      return socket.emit('join', id, (function(_this) {
        return function(socketIds) {
          console.log('Handshake:: join', JSON.stringify(socketIds));
          return callback(null, socketIds);
        };
      })(this));
    };

    Handshake.prototype.leave = function(id, callback) {
      console.log('Handshake:: leave id:' + id);
      return callback(null, id);
    };

    Handshake.prototype.candidate = function(id, _candidate) {
      console.log('Handshake:: candidate', JSON.stringify(id));
      return socket.emit('exchange', {
        'to': id,
        'candidate': _candidate
      });
    };

    Handshake.prototype.description = function(id, _description) {
      console.log('Handshake:: description', JSON.stringify(id));
      return socket.emit('exchange', {
        'to': id,
        'sdp': _description
      });
    };

    _connect = function(data) {
      if (reactions.didConnect != null) {
        return reactions.didConnect(data);
      }
    };

    _exchange = function(data) {
      if (reactions.didExchange != null) {
        return reactions.didExchange(data);
      }
    };

    _leave = function(id) {
      if (reactions.didLeave != null) {
        return reactions.didLeave(id);
      }
    };

    return Handshake;

  })();

  if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    module.exports = Handshake;
  }

  if ((typeof window !== "undefined" && window !== null)) {
    window.Handshake = Handshake;
  }

}).call(this);

//# sourceMappingURL=Handshake.js.map
