var jwt = require('jsonwebtoken');
var util = require(__server + '/util/util');
var logger = require(__server + '/util/log').logger('jwtAuth');

module.exports = function(req, res, next) {
  var token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token'];
  var respJSON = new util.jsonRet();
  if (token) {
    try {
      var decoded = jwt.verify(token, util.secretKey);

      if (decoded.exp <= (Date.now() / 1000)) {
        res.writeHeader(200, util.contentType);
        respJSON.code = 102; //Access token has expired
        res.json(respJSON);
      }
      req.uid = decoded.data;
      next();

    } catch (err) {
      res.writeHeader(200, util.contentType);
      respJSON.code = 101; //token error
      res.json(respJSON);
    }
  } else {
    req.message = "no token"; 
    next();
  }
};