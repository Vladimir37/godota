var express = require('express');
var auth = require('../controllers/auth');

var router = express.Router();

router.post('/login', auth.login);
router.get('/check', auth.check);
router.get('/logout', auth.logout);

module.exports = router;