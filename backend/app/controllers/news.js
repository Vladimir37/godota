'use strict';

var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

var Models = require('../models/main');

class NewsController {
    constructor() {
        this.imagePath = '/app/client/source/img/main_images/';
        this.appDir = path.dirname(require.main.filename);

        this.addAction = this.addAction.bind(this);
        this.fileProcessing = this.fileProcessing.bind(this);
    }

    index(req, res, next) {
        Models.news.find().then((news) => {
            news.reverse();
            res.render('news/index', {
                news,
                err: req.query.err
            });
        }).catch((err) => {
            res.render('errors/e500');
        });
    }

    addPage(req, res, next) {
        res.render('news/add');
    }

    editPage(req, res, next) {
        var num = req.params.num;
        Models.news.findById(num).then((news) => {
            res.render('news/edit', {
                news,
                err: req.query.err
            });
        }).catch(() => {
            res.render('errors/e404');
        });
    }

    addAction(req, res, next) {
        var main_image = null;
        var form = new formidable.IncomingForm({
            encoding: 'utf-8',
            uploadDir: this.appDir + '/tmp',
            multiples: true 
        });

        form.parse(req, (err, fields, files) => {
            this.fileProcessing(files.main_image).then(function (name) {
                return Models.news.create({
                    title: fields.title,
                    cover: fields.cover,
                    text: fields.text,
                    tags: fields.tags.split(' '),
                    mainImage: name,
                    // galleryExist: Boolean,
                    // galleryList: Array,
                    date: new Date()
                });
            }).then(() => {
                res.redirect('/news/');
            }).catch((err) => {
                console.log(err);
                res.redirect('/news/?err=500');
            });
        });
    }

    editAction(req, res, next) {
        var num = req.params.num;
        var date = new Date(req.body.date);

        if (isNaN(date)) {
            return res.redirect('/news/edit/' + num + '/?err=417');
        }

        Models.news.update({
            _id: num
        }, {
            title: req.body.title,
            cover: req.body.cover,
            text: req.body.text,
            date: date
        }).then(() => {
            res.redirect('/news/');
        }).catch((err) => {
            res.redirect('/news/?err=500');
        });
    }

    deleteAction(req, res, next) {
        var num = req.params.num;
        Models.news.findOneAndRemove({
            _id: num
        }).then(() => {
            res.redirect('/news/');
        }).catch((err) => {
            res.redirect('/news/?err=500');
        });
    }

    // Utility 

    fileProcessing(file) {
        return new Promise ((resolve, reject) => {
            if (!file) {
                resolve(null);
            }

            var fileNameArr = file.type.split('/');

            if (fileNameArr[0] != 'image') {
                fs.unlink(file.path);
                reject('Incorrect file');
            }

            var newFileName = ((new Date()).getTime() / 1000).toFixed(0) + '.' + fileNameArr[1];
            console.log(file.path);

            fs.rename(file.path, this.appDir + this.imagePath + newFileName, function(err) {
                if (err) {
                    reject(err);
                }
            });
            resolve(file.name + '.' + fileNameArr[1]);
        });        
    }
}

var NewsInstance = new NewsController();

module.exports = NewsInstance;