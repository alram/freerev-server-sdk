var assert = require('assert');
var querystring = require('querystring');
var _doRequest = require('./doRequest')._doRequest;
var config = require('./config').config;
var returnError = require('./error.js');

var ddns = function () {
        
  // Options for HTTP client
  var options = {
    host: config.host,
    port: config.port,
    path: '/ddns.cgi',
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'content-type': 'application/x-www-form-urlencoded'
    }
  };
        
  // getDDNS func
  function getDDNS(cookie, cb) {
                
    var data = 'method=ddns.providers';
                
    assert.ok(options.headers);
    options.headers['content-length'] = data.length;
    options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_ddns_state'
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
  // end of getDDNS func
        
  // configureDDNS func
  // TODO: ERROR MGMT
  function configureDDNS(params, cb) {
                                
    var dataJSON = {
      method: 'ddns.set_provider_config'
    };
                
    if (!params.enabled) {
      return cb(returnError.enabledMissing);
    }
                
    if (params.enabled === 'true') {
      dataJSON.ddns_provider_enabled = 'on'
      dataJSON.ddns_provider_user = params.user,
      dataJSON.ddns_provider_password = params.password,
      dataJSON.ddns_provider_hostname = params.hostname
    }
    else if (params.enabled === 'false') {
      dataJSON.ddns_provider_user = '',
      dataJSON.ddns_provider_password = '',
      dataJSON.ddns_provider_hostname = ''
    }
    else {
      return cb(returnError.enabledWrongValue);
    }
                
    if (params.service === 'dyndns') {
      dataJSON.ddns_provider_name = 'dyndns',
      dataJSON.config_dyndns = 'Valider'
    }
    else if (params.service === 'noip') {
      dataJSON.ddns_provider_name = 'noip',
      dataJSON.config_noip = 'Valider'
    }
    else {
      return cb(returnError.ddnsServiceMising);
    }
                
    var data = querystring.stringify(dataJSON);
                
    assert.ok(options.headers);
    options.headers['content-length'] = data.length;
    options.headers['Referer'] = 'http://mafreebox.freebox.fr/settings.php?page=conn_ddns_config'
    options.headers['Cookie'] = params.cookie;
                
    _doRequest(options, data, function (err, d) {
      if(err) {
        return cb(err);
      }
      else {
        return cb('', d);
      }
    });
  }
  //end of configureDDNS func
        
  return {
    getDDNS: getDDNS,
    configureDDNS: configureDDNS
  };      
}

module.exports = ddns();
