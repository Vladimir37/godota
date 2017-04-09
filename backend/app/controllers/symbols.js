'use strict';

var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

var Models = require('../models/main');

class SymbolsController {
    constructor() {
        this.symbolsPath = '/app/client/source/img/symbols/';
        this.appDir = path.join(__dirname, '../../');
        
        this.addAction = this.addAction.bind(this);        
        this.editNameAction = this.editNameAction.bind(this);        
        this.editImageAction = this.editImageAction.bind(this);        
        this.deleteAction = this.deleteAction.bind(this);        

        this.fileProcessing = this.fileProcessing.bind(this);
    }

    index(req, res, next) {
        Models.symbols.find().then((symbols) => {
            symbols.reverse();
            res.render('symbols/index', {
                symbols,
                err: req.query.err
            });
        }).catch((err) => {
            res.render('errors/e500');
        });
    }

    addAction(req, res, next) {
        var form = new formidable.IncomingForm({
            encoding: 'utf-8',
            uploadDir: this.appDir + '/tmp',
            multiples: true 
        });

        form.parse(req, (err, fields, files) => {
            Models.symbols.findOne({
                name: fields.name
            }).then((symbolExist) => {
                if (symbolExist) {
                    fs.unlink(files.file.path);
                    throw 'Exist';
                }
                return this.fileProcessing(files.file);
            }).then((filename) => {
                return Models.symbols.create({
                    name: fields.name,
                    file: filename
                });
            }).then(() => {
                res.redirect('/symbols/');
            }).catch((err) => {
                console.log(err);
                var err_num = (err == 'Exist' ? 417 : 500);
                res.redirect('/symbols/?err=' + err_num);
            });
        });
    }

    editNameAction(req, res, next) {
        Models.symbols.findOne({
            name: req.body.name
        }).then((symbolExist) => {
            if (symbolExist) {
                throw 'Exist';
            }
            return Models.symbols.findById(req.params.num);
        }).then((target_symbol) => {
            target_symbol.name = req.body.name;
            return target_symbol.save();
        }).then(() => {
            res.redirect('/symbols/');
        }).catch((err) => {
            console.log(err);
            var err_num = (err == 'Exist' ? 417 : 500);
            res.redirect('/symbols/?err=' + err_num);
        });
    }

    editImageAction(req, res, next) {
        var num = req.params.num;
        var newFileName = '';

        var form = new formidable.IncomingForm({
            encoding: 'utf-8',
            uploadDir: this.appDir + '/tmp',
            multiples: true 
        });

        form.parse(req, (err, fields, files) => {
            this.fileProcessing(files.image).then((name) => {
                newFileName = name;
                return Models.symbols.findById(num);
            }).then((target_symbol) => {
                fs.unlink(this.appDir + this.symbolsPath + target_symbol.file, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
                target_symbol.file = newFileName;
                return target_symbol.save();
            }).then(() => {
                res.redirect('/symbols/');
            }).catch((err) => {
                console.log(err);
                res.redirect('/symbols/?err=500');
            });
        });
    }

    deleteAction(req, res, next) {
        Models.symbols.findById(req.params.num).then((target_symbol) => {
            fs.unlink(this.appDir + this.symbolsPath + target_symbol.file, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            return target_symbol.remove();
        }).then(() => {
            res.redirect('/symbols/');
        }).catch((err) => {
            console.log(err);
            res.redirect('/symbols/?err=500');
        });
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

            fs.rename(file.path, this.appDir + this.symbolsPath + newFileName, function(err) {
                if (err) {
                    reject(err);
                }
            });
            resolve(newFileName);
        });
    }
}

var SymbolsInstance = new SymbolsController();

module.exports = SymbolsInstance;