[![build status](https://secure.travis-ci.org/alram/freerev-server-sdk.png)](http://travis-ci.org/alram/freerev-server-sdk)
#Discontinued
I don't have Free anymore. Code needs a bit of refactoring but is usable as a basis.

#Freebox Revolution Server SDK - Documentation

This describes how to use this SDK.

I did not intend to do a SDK at first, just a REST API, hence some work still need to be done in order to make this SDK more usable.

##Installation

  git clone git://github.com/alram/freerev-server-sdk.git

##Errors

Errors are formatted as follow:

    error: {
      header: {
        httpCode: xxx
      },
      body: {
        code: 'httpMessage',
        message: 'Error description'
      }
    }

##Auth and Token

### Freebox Auth
First step is to connect to the freebox. This will return a token.

    .connect(object, cb);
**Object**: { login: 'freebox', passwd: 'freeboxpassword' }.
**Callback**: error, cookie

##Conn

###Status
Generic informations about your internet connection.

    .getStatus(token, cb);
**cb**: error, data.

###Ping
Get remote ping status.

    .remotePingStatus(token, cb);
**cb**: error, data { enabled: true/false }.

(De)Activate remote ping.

    .changeRemotePing(params, cb);
**params**:
{ token:yyy, enabled: true/false }
**cb**: error, {}

###Remote HTTP Access

Get remote access status

    .remoteAccessStatus(token, cb);
**cb**: error, { enabled: true/false, http_port: XX }

Change remote access

    .changeRemoteAccess(params, cb);
**params**:
{ token: yyy, enabled: true/false, http_port: XX}
*http\_port* is optional when deactivating remote access.
**cb**: error, {}

###Wake On Lan

Get WakeOnLan status

    .wakeOnLanStatus(token, cb);
**cb**: error, data

Change Wake On Lan

    .changeWOL(params, cb);
**params**:
{ token: yyy, enabled: true/false }
**cb**: error, {}

###Logs

Get Logs

    .getLogs(token, cb);
**cb**: error, data

Flush logs

    .flushLogs(token, cb);
**cb**: error, {}

##DDNS

Get DDNS Configuration (NO-IP and DynDNS).

    .getDDNS(token, cb);
**cb**: error, data

Change DDNS Configuration

    .configureDDNS(params, cb);
**params**:
{ token; yyy, enabled: true/false, user: _user_, password: _password_, hostname: _hostname_, service: dyndns/noip }
_user, password, hostname, service_ are optional when deactivating DDNS.

##Example

    var freeSDK = require('./freerev-server-sdk');

    var auth = {
      login: 'freebox',
      passwd: 'password'
    };

     freeSDK.connect(auth, function (error, token) {
    	if (error) throw error;
    	freeSDK.getStatus(token, function (error, status) {
    	  if (error) throw error;
    		  console.log(status);
    	});
    });

