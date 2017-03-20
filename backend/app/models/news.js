var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
    title: String,
    text: String,
    tags: Array,
    mainImage: String,
    galleryExist: Boolean,
    galleryList: Array,
    date: Date
});

var newsModel = mongoose.model('News', newsSchema);

module.exports = newsModel;