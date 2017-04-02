'use strict';

class ChatHandlers {
    constructor() {
        this.names = {};
    }

    connection(socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('test', function (data) {
            console.log(data);
        });
    }
}

var ChatHandlersInstance = new ChatHandlers();

module.exports = ChatHandlersInstance;