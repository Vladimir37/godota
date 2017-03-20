'use strict';

var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

var Models = require('../models/main');

class NewsController {
    constructor() {
        this.imagePath = '/app/client/source/img/main_images/';
        this.galleryPath = '/app/client/source/img/gallery/';
        this.appDir = path.dirname(require.main.filename);

        this.addAction = this.addAction.bind(this);
        this.changeMainImage = this.changeMainImage.bind(this);
        this.addGalleryImage = this.addGalleryImage.bind(this);
        
        this.fileProcessing = this.fileProcessing.bind(this);
        this.galleryProcessing = this.galleryProcessing.bind(this);
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
            var mainFileName = null;
            this.fileProcessing(files.main_image).then((name) => {
                mainFileName = name;
                if (files.gallery_0) {
                    return this.galleryProcessing(files);
                } else {
                    return []
                }
            }).then((gallery_list) => {
                gallery_list = gallery_list.filter(n => n);

                return Models.news.create({
                    title: fields.title,
                    text: fields.text,
                    tags: fields.tags.split(' ').filter(n => n),
                    mainImage: mainFileName,
                    galleryExist: gallery_list.length > 0,
                    galleryList: gallery_list,
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
            text: req.body.text,
            tags: req.body.tags.split(' ').filter(n => n),
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

    deleteMainImage(req, res, next) {
        //
    }

    changeMainImage(req, res, next) {
        //
    }

    deleteGalleryImage(req, res, next) {
        //
    }

    addGalleryImage(req, res, next) {
        //
    }

    // Utility 

    fileProcessing(file) {
        return new Promise ((resolve, reject) => {
            if (!file.size) {
                resolve(null);
            }

            var fileNameArr = file.type.split('/');

            if (fileNameArr[0] != 'image') {
                fs.unlink(file.path);
                reject('Incorrect file');
            }

            var newFileName = ((new Date()).getTime() / 1000).toFixed(0) + '.' + fileNameArr[1];

            fs.rename(file.path, this.appDir + this.imagePath + newFileName, function(err) {
                if (err) {
                    reject(err);
                }
            });
            resolve(newFileName);
        });        
    }

    galleryProcessing(files) {
        var filesArr = [];
        for (var filename in files) {
            if (filename.slice(0, 8) == 'gallery_') {
                filesArr.push(files[filename]);
            }
        };

        var currentNum = 0;

        var filesArr = filesArr.map((file) => {
            return new Promise((resolve, reject) => {
                var fileNameArr = file.type.split('/');

                if (fileNameArr[0] != 'image') {
                    fs.unlink(file.path);
                    resolve('');
                }

                var newFileName = (((new Date()).getTime() / 1000).toFixed(0) + '_' + currentNum) + '.' + fileNameArr[1];
                currentNum++;

                fs.rename(file.path, this.appDir + this.galleryPath + newFileName, function(err) {
                    if (err) {
                        reject(err);
                    }
                });
                resolve(newFileName);
            });
        });

        return Promise.all(filesArr);
    }
}

var NewsInstance = new NewsController();

module.exports = NewsInstance;