var process = require('process');
var mongoose = require('mongoose');

var config = require('../../config.json');
var twitch = require('./twitch');
var youtube = require('./youtube');
var admin = require('./admin');
var news = require('./news');
var symbols = require('./symbols');

var connection = mongoose.connection;

//connection check
connection.on('open', function() {
    console.log('Connection to DB created');
});
connection.on('error', function(err) {
    console.log('Failed to connect to DB!');
    console.log(err);
    process.exit(1);
});

function connectDB(port, database) {
    mongoose.connect('mongodb://localhost:' + port + '/' + database);
}

var models = {
    twitch,
    youtube,
    admin,
    news,
    symbols,
    connectDB
};

module.exports = models;