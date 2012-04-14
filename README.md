
#Freebox Revolution Server SDK - Documentation

This describes how to use this SDK.

I did not intend to do a SDK at first, just a REST API, hence some work still need to be done in order to make this SDK more usable.

##Installation
npm install freerev-server-sdk

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
First step is to connect to the freebox. This will return a cookie.

    .connect(object, cb);
**Object**: { login: 'freebox', passwd: 'freeboxpassword' }.
**Callback**: error, cookie

### Generate Token
After getting a cookie, you need to generate a token.

    .generateToken(cookie, cb);
**Cookie**: Self explanatory.
**cb**: error, token

###Verify token validity

    .verifyToken(token, cb);
**token**: Self explanatory.
**cb**: error, cookie

##Conn

###Status
Generic informations about your internet connection.

    .getStatus(cookie, cb);
**cb**: error, data.

###Ping
Get remote ping status.

    .remotePingStatus(cookie, cb);
**cb**: error, data { enabled: true/false }.

(De)Activate remote ping.

    .changeRemotePing(params, cb);
**params**:
{ cookie:yyy, enabled: true/false }
**cb**: error, {}

###Remote HTTP Access

Get remote access status

    .remoteAccessStatus(cookie, cb);
**cb**: error, { enabled: true/false, http_port: XX }

Change remote access

    .changeRemoteAccess(params, cb);
**params**:
{ cookie: yyy, enabled: true/false, http_port: XX}
*http\_port* is optional when deactivating remote access.
**cb**: error, {}

###Wake On Lan

Get WakeOnLan status

    .wakeOnLanStatus(cookie, cb);
**cb**: error, data

Change Wake On Lan

    .changeWOL(params, cb);
**params**:
{ cookie: yyy, enabled: true/false }
**cb**: error, {}

###Logs

Get Logs

    .getLogs(cookie, cb);
**cb**: error, data

Flush logs

    .flushLogs(cookie, cb);
**cb**: error, {}

##DDNS

Get DDNS Configuration (NO-IP and DynDNS).

    .getDDNS(cookie, cb);
**cb**: error, data

Change DDNS Configuration

    .configureDDNS(params, cb);
**params**:
{ cookie; yyy, enabled: true/false, user: _user_, password: _password_, hostname: _hostname_, service: dyndns/noip }
_user, password, hostname, service_ are optional when deactivating DDNS.

##Example

You can check the [Freebox Revolution Server API](https://github.com/alram/freerev-server-api) to see the SDK usage. Here is a quick example:

    var freeSDK = require('freerev-server-sdk');

    var auth = {
			login: 'freebox',
			passwd: 'password'
		};

    function statusList(token) {
    	freeSDK.verifyToken(token, function (error, cookie) {
    		if (error) throw error;
    		freeSDK.getStatus(cookie, function (error, status) {
    			if (error) throw error;
    			console.log(status);
    		});
    	});
    }

    freeSDK.connect(auth, function (error, cookie) {
    	if (error) throw error;
    	freeSDK.generateToken(cookie, function (error, token) {
    		if (error) throw error;
    		statusList(token);
    	});
    });

