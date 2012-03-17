/*
	 Used to have à la restify errors when using the http module from node
	 for freebox calls
	 Maybe using restify everywhere is a better solution ?
 */

exports.enabledMissing = {
	header: {
		httpCode: 400
	},
	body: {
		code:'BadRequest', 
		message: 'enabled=true/false is mandatory'
	}
};

exports.enabledWrongValue = {
	header: {
		httpCode: 400
	},
		body: {
		code:'BadRequest', 
		message: 'enabled can only take true or false as value'
	}
};

exports.ddnsServiceMising = {
	header: {
		httpCode: 400
	},	
	body: {
		code:'BadRequest', 
		message: 'You must specify the service you want to configure (dyndns or noip)'
	}
};

exports.httpPortMissing = { 
	header: {
		httpCode: 400
	},
	body: {
		code: 'BadRequest', 
		message: 'http_port must be specified' 
	}
};

exports.wrongAuth = { 
	header: {
		httpCode: 401
	},
	body: {
		code: 'Unauthorized', 
		message: 'Incorrect login/password' 
	}
};

exports.emptyAuth = {
	header: {
		httpCode: 401
	},
	body: {
		code: 'Unauthorized', 
		message: 'You must specify a login and password' 
	}
};

exports.invalidToken = {
	header: {
		httpCode: 401
	},
	body: {
		code: 'Unauthorized', 
		message: 'Token is either invalid or has expired' 
	}
};

exports.missingToken = {
	header: {
		httpCode: 401
	},
	body: {
		code: 'Unauthorized',
		message: 'You must specify a token. If you do not have one. Use GET /token'
	}
};

exports.internalServerError = {
	header: {
		httpCode: 500
	},	
	body: {
		code: 'InternalServerError',
		message: 'Unknown Server Error. Most probably Free changed something in its API'
	}
};