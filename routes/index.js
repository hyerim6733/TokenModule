var express = require('express');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {

  res.render('login');
});

router.get('/getVersion/dbdud', function (req, res, next) {
  var cliver = req.query.version;
  console.log(`서버버전 : `,cliver);
  console.log(`유영버전 : `,process.env.dbdud);
  if(cliver == process.env.dbdud) {
    res.json({ result: "success" });
  } else {
    res.json({ result: "fail" });
  }
  
  


})

module.exports = router;
