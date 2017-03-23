var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags: Array,
    mainImage: String,
    galleryExist: Boolean,
    galleryList: Array,
    date: Date
});
newsSchema.index({
    body: 'text', 
    title: 'text'
});

var newsModel = mongoose.model('News', newsSchema);

module.exports = newsModel;