var freeSDK = require('../freerevSDK');

var auth = {
  login: 'freebox',
  passwd: 'password'
};

freeSDK.connect(auth, function (error, token) {
  console.log('Connecting to the freebox');
  if(error) {
    console.log('Error: '+ JSON.stringify(error));
  }
  else {
    console.log('Connection OK. Token is ' + token + '.');
    console.log('Get internet connection status...');
    freeSDK.getStatus(token, function (error, status) {
      if(error) {
        console.log('Error: ' + JSON.stringify(error));
      }
      else {
        console.log('Status: ' + JSON.stringify(status));
        console.log('Now getting remote ping status...');
        ping(token);
      }
    });
  }
});

function ping(token) {
  freeSDK.remotePingStatus(token, function (error, rpStatus) {
    if(error) {
      console.log('Error: ' + JSON.stringify(error));
    }
    else {
      console.log('Remote Ping Status: ' + JSON.stringify(rpStatus));
      var statusToInput = 'true';
      if(rpStatus.enabled === true) statusToInput = 'false';
      console.log('Changing Remote Ping to '+ statusToInput  +'...');
      var params = { token: token, enabled: statusToInput };
      freeSDK.changeRemotePing(params, function (error) {
        if(error) {
          console.log('Error: ' + JSON.stringify(error));
        }
        else {
          freeSDK.remotePingStatus(token, function (error, rpStatus) {
            if(rpStatus.enabled.toString() !== statusToInput){
              console.log('There was a unknown problem while changing remote ping');
            }
            else {
              console.log('Remote ping was changed successfuly');
              remoteAccess(token);
            }
          });
        }
      });
    }
  });
}

function remoteAccess(token) {
  console.log('Now checking remote access status...');
  freeSDK.remoteAccessStatus(token, function (error, raStatus) {
    if (error) {
      console.log('Error: ' + JSON.stringify(error));
    }
    else {
      console.log('Remote Access status: ' + JSON.stringify(raStatus));
      var statusToInput = 'true';
      if(raStatus.enabled === true) statusToInput = 'false';
      console.log('Change Remote Access to ' + statusToInput + '...');
      var params = { token: token, enabled: statusToInput, http_port: 80 };
      freeSDK.changeRemoteAccess(params, function (error) {
        if (error) {
          console.log('Error: ' + JSON.stringify(error));
        }
        else {
          freeSDK.remoteAccessStatus(token, function (error, raStatus) {
            if(raStatus.enabled.toString() !== statusToInput) {
              console.log('There was a unknown error while changing remote access');
            }
            else {
              console.log('Remote access was changed successfuly.');
              wol(token);
            }
          });
        }
      });
    }
  });
}

function wol(token) {
  console.log('Now checking WOL status...');
  freeSDK.wakeOnLanStatus(token, function (error, wolStatus) {
    if (error) {
      console.log('Error: ' + JSON.stringify(error));
    }
    else {
      console.log('Wake On Lan status: ' + JSON.stringify(wolStatus));
      var statusToInput = 'true';
      if(wolStatus.enabled === true) statusToInput = 'false';
      console.log('Change WOL to ' + statusToInput + '...');
      var params = { token: token, enabled: statusToInput };
      freeSDK.changeWOL(params, function (error) {
        if (error) {
          console.log('Error: ' + JSON.stringify(error));
        }
        else {
          freeSDK.wakeOnLanStatus(token, function (error, wolStatus) {
            if(wolStatus.enabled.toString() !== statusToInput) {
              console.log('There was a unknown error while changing WOL');
            }
            else {
              console.log('WOL was changed successfuly.');
              logs(token);
            }
          });
        }
      });
    }
  });
}

function logs(token) {
  console.log('Now checking logs...');
  freeSDK.getLogs(token, function (error, logs) {
    if(error) {
      console.log('Error: '+ JSON.stringify(error));
    }
    else {
      console.log('Logs: ' + JSON.stringify(logs));
      console.log('Now flushing logs...');
      freeSDK.flushLogs(token, function (error) {
        if (error) {
          console.log('Error: ' + JSON.stringify(error));
        }
        else {
          console.log('Logs were flushed successfuly');
          ddns(token);
        }
      });
    }
  });
}

function ddns(token) {
  console.log('Now checking ddns status...');
  freeSDK.getDDNS(token, function (error, ddnsStatus) {
    if (error) {
      console.log('Error: ' + JSON.stringify(error));
    }
    else {
      console.log('DDNS status: ' + JSON.stringify(ddnsStatus));
      var dyndnsStatusToInput = 'true';
      if(ddnsStatus.dyndns.enabled === true) dyndnsStatusToInput = 'false';
      console.log('Changing DynDNS config to ' + dyndnsStatusToInput + '...');
      var params = { token: token, enabled: dyndnsStatusToInput, user: 'dummy', password: 'dummy', hostname: 'dummy', service: 'dyndns' };
      freeSDK.configureDDNS(params, function (error) {
        if(error) {
          console.log('Error: ' + JSON.stringify(error));
        }
        else {
          var noipStatusToInput = 'true';
          if(ddnsStatus.noip.enabled === true) noipStatusToInput = 'false';
          console.log('Changing DynDNS config to ' + noipStatusToInput + '...');
          params.enabled = noipStatusToInput;
          params.service = 'noip';
          freeSDK.configureDDNS(params, function (error) {
            if (error) {
              console.log('Error: ' + JSON.Stringify(error));
            }
            else {
              freeSDK.getDDNS(token, function (error, ddnsStatus) {
                if(ddnsStatus.dyndns.enabled.toString() !== dyndnsStatusToInput || ddnsStatus.noip.enabled.toString() !== noipStatusToInput) {
                  console.log('There was an error while changing DynDNS and/or No-IP configuration.');
                }
                else {
                  console.log('DynDNS and No-IP configurations have changed successfuly');
                }
              });
            }
          });
        }
      });
    }
  });
}

