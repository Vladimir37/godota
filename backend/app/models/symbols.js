var mongoose = require('mongoose');

var symbolSchema = new mongoose.Schema({
    name: String,
    file: String
});

var symbolModel = mongoose.model('Symbols', symbolSchema);

module.exports = symbolModel;