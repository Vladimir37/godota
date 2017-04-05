'use strict';

var Models = require('../models/main');

class ApiController {
    constructor() {
        this.getAllNews = this.getAllNews.bind(this);
        this.getAllYoutube = this.getAllYoutube.bind(this);
        this.getAllTwitch = this.getAllTwitch.bind(this);
        this.getAllSymbols = this.getAllSymbols.bind(this);
        this.textSearch = this.textSearch.bind(this);
        this.tagSearch = this.tagSearch.bind(this);
    }

    getAllNews(req, res, next) {
        Models.news.find().then((news) => {
            news.reverse();
            res.json(this.responseFormat(news, false));
        }).catch((err) => {
            res.json(this.responseFormat(err, true));
        });
    }

    getAllYoutube(req, res, next) {
        Models.youtube.find().then((channels) => {
            channels.reverse();
            res.json(this.responseFormat(channels, false));
        }).catch((err) => {
            res.json(this.responseFormat(err, true));
        });
    }

    getAllTwitch(req, res, next) {
        Models.twitch.find().then((channels) => {
            channels.reverse();
            res.json(this.responseFormat(channels, false));
        }).catch((err) => {
            res.json(this.responseFormat(err, true));
        });
    }

    getAllSymbols(req, res, next) {
        Models.symbols.find().then((symbols) => {
            res.json(this.responseFormat(symbols, false));
        }).catch((err) => {
            res.json(this.responseFormat(err, true));
        });
    }

    textSearch(req, res, next) {
        var search_text = req.query.search;
        if (!search_text) {
            res.json(this.responseFormat("Empty request", true));
            return false;
        }

        Models.news.find({
            $text: {
                $search: search_text
            }
        }).then((news) => {
            res.json(this.responseFormat(news, false));
        }).catch((err) => {
            res.json(this.responseFormat(err, true));
        });
    }

    tagSearch(req, res, next) {
        var search_tag = req.query.search;
        if (!search_tag) {
            res.json(this.responseFormat("Empty request", true));
            return false;
        }

        Models.news.find({
            tags: search_tag
        }).then((news) => {
            res.json(this.responseFormat(news, false));
        }).catch((err) => {
            res.json(this.responseFormat(err, true));
        });
    }

    responseFormat(data, error) {
        var response = {
            error,
            data
        };
        return response;
    }
}

var ApiInstance = new ApiController();

module.exports = ApiInstance;