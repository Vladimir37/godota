var http = require('http');

var config = require('../../config_test');
var app = require('../../app/main');
var db = require('../../app/models/main');

// function startServer() {
//     db.connectDB(config.db_port, config.database).then(() => {
//         console.log('conn');
//     })
//     app.listen(config.app_port);
// }

module.exports = app;