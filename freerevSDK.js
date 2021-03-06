var http = require('http');
var config = require('./config').config;
var querystring = require('querystring');
var conn = require('./conn');
var ddns = require('./ddns');
var _generateToken = require('./token')._generateToken;
var returnError = require('./error');

var freerevAPI = function () {

  // BEGIN OF .connect()
  function connect(auth, cb) {

  if (!auth.login  || !auth.passwd) {
    return cb(returnError.emptyAuth);
  }

  var data = querystring.stringify(auth);

  var options = {
    host: config.host,
    port: config.port,
    path: '/login.php',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': data.length
    }
  };

  var req = http.request(options, function(res) {
    if(res.statusCode === 302) {
      var cookie = res.headers['set-cookie'];
      _generateToken(cookie, function (error, token) {
        if(error) {
          return cb(error);
        }
        else {
          return cb('', token);
        }
      });
    }
    else {
      return cb(returnError.wrongAuth);
    }
  });

  req.write(data);
  req.end();
};
// END OF .CONNECT

  return {
    connect: connect,
    getStatus: conn.getStatus,
    remotePingStatus: conn.remotePingStatus,
    changeRemotePing: conn.changeRemotePing,
    remoteAccessStatus: conn.remoteAccessStatus,
    changeRemoteAccess: conn.changeRemoteAccess,
    wakeOnLanStatus: conn.wakeOnLanStatus,
    changeWOL: conn.changeWOL,
    getLogs: conn.getLogs,
    flushLogs: conn.flushLogs,
    getDDNS: ddns.getDDNS,
    configureDDNS: ddns.configureDDNS
//    generateToken: token.generateToken
//    _verifyToken: token._verifyToken
  };

};

module.exports = freerevAPI();
