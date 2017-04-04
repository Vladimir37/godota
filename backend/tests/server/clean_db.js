var process = require('process');

var db = require('../../app/models/main');
var config = require('../../config_test');

function cleanDB() {
    db.connectDB(config.db_port, config.database).then(() => {
        var actions = [db.admin.remove()];
        return Promise.all(actions);
    }).then((qw) => {
        console.log('Database was cleaned');
        db.disconnectDB();
        process.exit(0);
    }).catch((err) => {
        console.log('Error:' + err);
        db.disconnectDB();
        process.exit(1);
    });
}

cleanDB();