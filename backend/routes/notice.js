var express = require('express');
var router = express.Router();
var noticeList = require('../noticeList.json');

router.get('/', function(req, res, next) {
    console.log("============================ notiecList ==========================");
    res.send(noticeList);
});

module.exports = router;