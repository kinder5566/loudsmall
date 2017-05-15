var jsonRet = function() {
  this.data = {};
  this.code = 0;
};

var contentType = {"Content-Type": "application/json; charset=utf-8"};
var secretKey = 'sup6xl3su;6'

module.exports = {
  jsonRet: jsonRet,
  contentType: contentType,
  secretKey: secretKey
};