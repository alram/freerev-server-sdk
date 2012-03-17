//Private function to do the requests
var http = require('http');
var returnError = require('./error');

exports._doRequest = function (options, data, cb) {
	
	var req = http.request(options, function (res) {
		if (res.statusCode === 200) {
		  res.setEncoding('utf8');
			res.on('data', function (d) {
				return cb('', JSON.parse(d));
			});
		}
		//Cookie has expired or is not valid
		else {
			return cb({code: 401, message: 'Unauthorized: cookie has exp or invalid'});
		}
	});
	
	req.write(data);
	req.end();	
};
//end of _doRequest