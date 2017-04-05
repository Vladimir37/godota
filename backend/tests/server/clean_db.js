var process = require('process');

var db = require('../../app/models/main');

function cleanDB(done) {
    var actions = [db.admin.remove()];
    Promise.all(actions).then(() => {
        console.log('Database was cleaned');
        db.disconnectDB();
        done();
    }).catch((err) => {
        console.log('Error:' + err);
        db.disconnectDB();
    });
}

module.exports = cleanDB;