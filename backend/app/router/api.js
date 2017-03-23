var express = require('express');
var api = require('../controllers/api');

var router = express.Router();

router.get('/all_news', api.getAllNews);
router.get('/all_twitch', api.getAllTwitch);
router.get('/all_youtube', api.getAllYoutube);
router.get('/all_symbols', api.getAllSymbols);
router.get('/search_text', api.textSearch);
router.get('/search_tag', api.tagSearch);

module.exports = router;