'use strict';

var Chance = require('chance');
var chance = new Chance();

class ChatHandlers {
    constructor() {
        this.names = {};

        this.connection = this.connection.bind(this);
        this.send = this.send.bind(this);
        this.message = this.message.bind(this);
        this.nameGenerator = this.nameGenerator.bind(this);
        this.handle = this.handle.bind(this);
    }

    connection(socket) {
        var ip = socket.handshake.address;
        if (!this.names[ip]) {
            this.names[ip] = this.nameGenerator();
        }
        
        socket.emit('new_user', { 
            name: this.names[ip]
        });

        socket.on('send', this.handle(this.send, socket));
    }

    send(data, socket) {
        var ip = socket.handshake.address;
        socket.emit('message', {
            name: this.names[ip],
            message: data.message
        });
    }

    message(socket) {
        console.log('');
    }

    // Private

    nameGenerator() {
        var name;
        while (true) {
            var exist = false;

            var syllablesNum = chance.natural({
                min: 2, 
                max: 4
            });
            name = chance.word({
                syllables: syllablesNum
            });

            for (var ip in this.names) {
                if (this.names[ip] == name) {
                    exist = true;
                    break;
                }
            }
            
            if (exist) {
                continue;
            } else {
                break;
            }
        }

        return name;
    }

    handle(handler, socket) {
        return (data) => {
            return handler(data, socket);
        }
    }
}

var ChatHandlersInstance = new ChatHandlers();

module.exports = ChatHandlersInstance;