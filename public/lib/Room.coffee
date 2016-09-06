
class Room
    handshake = null
    channel = null

    constructor: (configuration, _observers) ->
        channel = new RTCChannel(configuration, _observers,
            {
                exchangeDescription: exchangeDescription
                exchangeCandidate: exchangeCandidate
            }
        )
        handshake = new Handshake(configuration,
            {
                didConnect: didConnect,
                didExchange: didExchange,
                didLeave: didLeave
            }
        )
        return

    join: (roomId, callback) ->
        handshake.join(roomId, (error, ids) ->
            console.log('Room:: join', JSON.stringify(ids));
            for id in ids
                channel.createListener(id, true)
            callback(null, ids) if callback?
        )
        return

    leave: (roomId, callback) ->
        handshake.leave(roomId, callback)
        return

    say: (text) ->
        channel.send(text)
        return

    exchangeDescription = (id, description) ->
        console.log('Room::id:'+id+' description', description);
        handshake.description(id,description) if (id != null)
        return

    exchangeCandidate = (id, candidate) ->
        console.log('Room::id:'+id+' candidate', candidate);
        handshake.candidate(id, candidate) if (id != null)
        return

    didConnect = () ->
        console.log('Room:: Did Connect, call get Media');

        channel.getMedia({ "audio": true, "video": true }, (stream) ->
            console.log("Room:: did Connect end: "+stream)
        )
        return

    didExchange = (data) ->
        console.log("Room:: did Exchange");
        channel.exchange(data)
        return

    didLeave = (id) ->
        console.log("Room:: did Leave, delete listener.");
        channel.deleteListener(id, (error, id) ->
            console.log("Handshake:: did Leave: "+id)
        )
        return

#    didConnect = (stream) ->
#        console.log("did Connect: "+id)
#        view.src = URL.createObjectURL(stream)
#        view.muted = true
#
#    didExchange = (id, description) ->
#        console.log("did Exchange: "+id+ " desc: "+description)
#
#    didLeave = (id) ->
#        console.log("did Leave: "+id)

module.exports = Room if (module? and module.exports?)
window.Room = Room if (window?)



