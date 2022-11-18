var express = require('express');
var router = express.Router();
var fs = require('fs-extra');

/* GET home page. */
router.get('/', function (req, res, next) {
  try {
    const publicPath = './public';
    const dir = fs.readdirSync(publicPath);
    const data = fs.readFileSync(`${publicPath}/text.txt`, 'utf8');
    res.render('index', { title: dir, fileContent: data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
