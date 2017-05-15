var express = require('express');
var fs = require("fs");
var jwtauth = require(__server + '/middleware/jwtAuth.js');
var logger = require(__server + '/util/log').logger('v1/index');

var router = express.Router();
router.use(jwtauth);

fs.readdir(__dirname, function(err, files) {
  if (err) {
    logger.error(err);
    return;
  }
  files.forEach(function(file) {
    if(file.indexOf('.js') == -1) return;
    if(file.indexOf('index.js') != -1) return;
    var module = './' + file.substring(0, file.indexOf('.'));
    require(module)(router);
  });
});

module.exports = router;