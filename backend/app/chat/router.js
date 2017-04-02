var io = require('socket.io');

var handlers = require('./handlers');

function setHandlers(app) {
    var server = require('http').Server(app);
    io = io(server);

    io.on('connection', handlers.connection);

    return server;
}

module.exports = setHandlers;