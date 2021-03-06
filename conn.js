var _doRequest = require('./doRequest')._doRequest;
var _verifyToken = require('./token')._verifyToken;
var config = require('./config').config;
var assert = require('assert');
var querystring = require('querystring');
var returnError = require('./error');

var conn = function () {

  // Options for HTTP client
  var options = {
    host: config.host,
    port: config.port,
    path: '/conn.cgi',
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'content-type': 'application/x-www-form-urlencoded'
    }
  };

  //getStatus function
  function getStatus(token, cb) {

    _verifyToken(token, function (error, cookie) {
      if (error) {
        return cb(error);
      }
      else {
        var data = 'method=conn.status';

        assert.ok(options.headers);
        options.headers['content-length'] = data.length;
        options.headers['Referer'] = 'http://mafreebox.freebox.fr/'
        options.headers['Cookie'] = cookie;

        _doRequest(options, data, function (err, d) {
          if(err) {
            return cb(returnError.internalServerError);
          }
          else {
            return cb('', d.result);
          }
        });
      }
    });
  }
  // end of getStatus function

  // remotePingStatus function
  function remotePingStatus(token, cb) {

    _verifyToken(token, function (error, cookie) {
      if (error) {
        return cb(error);
      }
      else {
        var data = 'method=conn.wan_ping_get';

        assert.ok(options.headers);
        options.headers['content-length'] = data.length;
        options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_config'
        options.headers['Cookie'] = cookie;

        _doRequest(options, data, function (err, d) {
          if(err) {
            return cb(returnError.internalServerError);
          }
          else {
            return cb('', { enabled: d.result });
          }
        });
      }
    });
  }
  // end of remotePingStatus function

  // changeRemotePing function
  function changeRemotePing(params, cb) {

    if(!params.token) {
      return cb(returnError.missingToken);
    }

    _verifyToken(params.token, function (error, cookie) {
      if (error) {
        return cb(error);
      }
      else {
        var dataJSON = {
          method: 'conn.wan_ping_set',
          config: 'Modifier'
        };

        if (!params.enabled) {
          return cb(returnError.enabledMissing);
        }

        if (params.enabled != 'true' && params.enabled != 'false') {
         return cb(returnError.enabledWrongValue);
        }

        (params.enabled === 'true') ? dataJSON.enabled = 'on' : null;
        var data = querystring.stringify(dataJSON);

        assert.ok(options.headers);
        options.headers['content-length'] = data.length;
        options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_config'
        options.headers['Cookie'] = cookie;

        _doRequest(options, data, function (err, d) {
          if(err) {
            return cb(err);
          }
          else {
            return cb('', d);
          }
        });
      }
    })
  }
  // end of changeRemotePing function

  // remoteAccessStatus function
  function remoteAccessStatus(token, cb) {

    _verifyToken(token, function (error, cookie) {
      if (error) {
        return cb(error);
      }
      else {
        var data = 'method=conn.remote_access_get';

        assert.ok(options.headers);
        options.headers['content-length'] = data.length;
        options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_config_remote'
        options.headers['Cookie'] = cookie;

        _doRequest(options, data, function (err, d) {
          if(err) {
            return cb(returnError.internalServerError);
          }
          else {
            return cb('', {
              enabled: d.result.http_enabled,
              http_port: d.result.http_port
            });
          }
        });
      }
    });
  }
  // end of remoteAccessStatus function

  // changeRemoteAccess function
  function changeRemoteAccess(params, cb) {

    if(!params.token) {
      return cb(returnError.missingToken);
    }

    _verifyToken(params.token, function (error, cookie) {
      if (error) {
        return cb(error);
      }
      else {
        var dataJSON = {
          method: 'conn.remote_access_set',
          config: 'Valider'
        };

        if (!params.enabled) {
          return cb(returnError.enabledMissing);
        }

        //  http_port _must_ be defined
        // TODO: Is http_port a number ?
        if (params.enabled === 'true') {
          if (!params.http_port) {
            return cb(returnError.httpPortMissing);
          }
          else {
            dataJSON.http_enabled = 'on';
            dataJSON.http_port = params.http_port;
          }
        }
        else if (params.enabled === 'false') {
          (params.http_port) ? dataJSON.http_port = params.http_port : dataJSON.http_port = 80;
        }
        else {
          return cb(returnError.enabledWrongValue);
        }

        var data = querystring.stringify(dataJSON);

        assert.ok(options.headers);
        options.headers['content-length'] = data.length;
        options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_config_remote'
        options.headers['Cookie'] = cookie;

        _doRequest(options, data, function (err, d) {
          if(err) {
            return cb(err);
          }
          else {
            return cb('', d);
          }
        });
      }
    });
  }
  //end of changeRemoteAccess function

  // wakeOnLanStatus function
  function wakeOnLanStatus(token, cb) {

    _verifyToken(token, function (error, cookie) {
      if (error) {
        return cb(error);
      }
      else {
        var data = 'method=conn.proxy_wol_get';

        assert.ok(options.headers);
        options.headers['content-length'] = data.length;
        options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_config_wol'
        options.headers['Cookie'] = cookie;

        _doRequest(options, data, function (err, d) {
          if(err) {
            return cb(returnError.internalServerError);
          }
          else {
            return cb('', { enabled: d.result });
          }
        });
      }
    });
  }
  // end of wakeOnLanStatus function

  // changeWOL function
  function changeWOL(params, cb) {

    if(!params.token) {
      return cb(returnError.missingToken);
    }

    _verifyToken(params.token, function (error, cookie) {
      if (error) {
        return cb(error);
      }
      else {
        var dataJSON = {
          method: 'conn.proxy_wol_set',
          config: 'Modifier'
        };

        if (!params.enabled) {
          return cb(returnError.enabledMissing);
        }

        if (params.enabled != 'true' && params.enabled != 'false') {
          return cb(returnError.enabledWrongValue);
        }

        (params.enabled === 'true') ? dataJSON.enabled = 'on' : null;
        var data = querystring.stringify(dataJSON);

        assert.ok(options.headers);
        options.headers['content-length'] = data.length;
        options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_config_wol'
        options.headers['Cookie'] = cookie;

        _doRequest(options, data, function (err, d) {
          if(err) {
            return cb(err);
          }
          else {
            return cb('', d);
          }
        });
      }
    });
  }
  // end of changeWOL function

  // getLogs function
  function getLogs(token, cb) {

    _verifyToken(token, function (error, cookie) {
      if (error) {
        return cb(error);
      }
      else {
        var data = 'method=conn.logs';

        assert.ok(options.headers);
        options.headers['content-length'] = data.length;
        options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_historic'
        options.headers['Cookie'] = cookie;

        _doRequest(options, data, function (err, d) {
          if(err) {
            return cb(returnError.internalServerError);
          }
          else {
            return cb('', d.result);
          }
        });
      }
    });
  }
  // end of getLogs function

  // Bgein flushLogs
  function flushLogs(token, cb) {

    _verifyToken(token, function (error, cookie) {
      if (error) {
        return cb(error);
      }
      else {
        var data = "method=conn.logs_flush&clear=Effacer+l'historique";

        assert.ok(options.headers);
        options.headers['content-length'] = data.length;
        options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_historic'
        options.headers['Cookie'] = cookie;

        _doRequest(options, data, function (err,d) {
          if(err) {
            return cb(err);
          }
          else {
            return cb('', d);
          }
        });
      }
    });
  }
//end of flushLogs function

  return {
    getStatus: getStatus,
    remotePingStatus: remotePingStatus,
    changeRemotePing: changeRemotePing,
    remoteAccessStatus: remoteAccessStatus,
    changeRemoteAccess: changeRemoteAccess,
    wakeOnLanStatus: wakeOnLanStatus,
    changeWOL: changeWOL,
    getLogs: getLogs,
    flushLogs: flushLogs
  };

};

module.exports = conn();
