var jwt = require('jsonwebtoken');
var GoogleAuth = require('google-auth-library');
var CLIENT_ID = require(__base + '/util/config').GOOGLE_SIGNIN_KEY
var auth = new GoogleAuth;
var client = new auth.OAuth2(CLIENT_ID, '', '');
var util = require(__server + '/util/util');

var users = []; // from db

module.exports = function (router) {

  router.post('/auth_token', function(req, res) {
    let token = req.body.token;
    let respJSON = new util.jsonRet();
    try {
      var decoded = jwt.verify(token, util.secretKey);
      respJSON.data.u_name = decoded.u_name;
      respJSON.data.token = token;
      respJSON.data.type = decoded.type;
      res.json(respJSON);
    } catch (err) {
      respJSON.code = 101; //token error
      res.json(respJSON);
    }
  });

  router.post('/sign_in', function(req, res) {
    let u_name = req.body.u_name;
    let respJSON = new util.jsonRet();
    if(u_name) {
      let token = jwt.sign({u_name: u_name, type: 'local'}, util.secretKey);
      respJSON.data.token = token;
      respJSON.data.u_name = u_name;
      respJSON.data.type = 'local';
      if(users.indexOf(u_name) === -1) users.push(u_name);
    }
    else {
      respJSON.code = 120;
    }
    res.json(respJSON);
  });

  router.post('/sign_in_google', function(req, res) {
    let email = req.body.email;
    let gtoken = req.body.token;
    let respJSON = new util.jsonRet();
    client.verifyIdToken(gtoken, CLIENT_ID, function(e, login) {
      if(e) { respJSON.code = 121; }
      else {
        let payload = login.getPayload();
        if(email === payload['email']) {
          let u_name = payload['name'];
          let token = jwt.sign({u_name: u_name, type: 'google'}, util.secretKey);
          respJSON.data.token = token;
          respJSON.data.u_name = u_name;
          respJSON.data.type = 'google';
          if(users.indexOf(u_name) === -1) users.push(u_name);
        }
        else { respJSON.code = 122; }
      }
      res.json(respJSON);
    });
  });

  router.post('/sign_out', function(req, res) {
    let u_name = req.body.u_name;
    let token = req.body.token;
    let respJSON = new util.jsonRet();

    let index = users.indexOf(u_name);
    if(index !== -1) users.splice(index, 1);
    res.json(respJSON);
  });
};