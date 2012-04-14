/*
 Generate, stores and verifies tokens
 */

var returnError = require('./error');
var tokenTable = [];

// Private function to store token
var _storeToken = function (token, cookie) {

  tokenTable.push({
    token: token,
    cookie: cookie
  });
};

// Generate a 5 char randmo token
// TODO: Check if token hasn't been already attributed
exports._generateToken = function (cookie, cb) {
  require('crypto').randomBytes(3, function(ex, buf) {
  var token = buf.toString('hex');
    _storeToken(token, cookie);
    cb('', token);
  });
};

// Private function to verify token validity
exports._verifyToken = function (token, cb) {
  if(!token) {
    return cb(returnError.missingToken);
  }
  var i = 0;
  var found = 0;

  for (i = 0; i < tokenTable.length; i++) {
    if(tokenTable[i].token === token) {
      found = 1;
      return cb('', tokenTable[i].cookie);
    }
  }

  if(found === 0)
    return cb(returnError.invalidToken);
};
