var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var path = require('path');
var sqlite3 = require('sqlite3');

/* GET home page. */
router.get('/', function (req, res, next) {
  try {
    const publicPath = './public';
    // const dir = fs.readdirSync(publicPath, {withFileTypes: true}).map(d => {
    //   var methods = ['isBlockDevice', 'isCharacterDevice', 'isDirectory', 'isFIFO', 'isFile', 'isSocket', 'isSymbolicLink'];
    //   var cur = {name: d.name};
    //   for (var method of methods) cur[method] = d[method]()
    //   return cur;
    // });
    const dir = fs.readdirSync(publicPath, {withFileTypes: true}).filter(file => file.isFile());
    console.table(dir);
    // const data = fs.readFileSync(`${publicPath}/text.txt`, 'utf8');
    dir.forEach(file => {
      console.log(fs.readFileSync(`${publicPath}/${file.name}`, 'utf8'));
    })
    // res.render('index', { title: dir, fileContent: data });
    res.json({ok: true});
  } catch (error) {
    console.log(error);
  }
});

router.get('/add', (req,res,next) => {
  const db = new sqlite3.Database('./test.db', (err) => console.error(err));
  console.log(db);
  db.run('CREATE TABLE IF NOT EXISTS songs(id INTEGER PRIMARY KEY AUTOINCREMENT, dir varchar(255), freeModeOnly boolean, name varchar(255), artist varchar(255), genre varchar(255), lang varchar(255))');
  res.json({ok:true})
})

module.exports = router;
