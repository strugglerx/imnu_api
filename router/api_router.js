var express = require('express');
var router = express.Router();
var api = require('../application/api');


router.get('/search',api.search);
router.get('/bookinfo',api.bookinfo);
router.get('/getcode',api.code);
router.post('/physical',api.st);
router.post('/score',api.score);

module.exports=router;