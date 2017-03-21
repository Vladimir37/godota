var express = require('express');
var symbols = require('../controllers/symbols');

var router = express.Router();

router.get('/', symbols.index);
router.post('/add', symbols.addAction);
router.post('/edit_name/:num', symbols.editNameAction);
router.post('/edit_image/:num', symbols.editImageAction);
router.post('/delete/:num', symbols.deleteAction);

module.exports = router;