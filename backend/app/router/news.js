var express = require('express');
var news = require('../controllers/news');

var router = express.Router();

router.get('/', news.index);
router.get('/add', news.addPage);
router.get('/edit/:num', news.editPage);
router.post('/add', news.addAction);
router.post('/edit/:num', news.editAction);
router.get('/delete/:num', news.deleteAction);

router.post('/main_image_delete/:num', news.deleteMainImage);
router.post('/main_image_edit/:num', news.changeMainImage);
router.post('/gallery_delete/:num/:img', news.deleteGalleryImage);
router.post('/gallery_add/:num', news.addGalleryImage);


module.exports = router;