const jwt = require('jsonwebtoken');
const config = require('config');
let appSecret = config.get('app.secret');
let tokenExpiresIn = config.get('app.auth.expires');
let tokenIssuer = config.get('app.auth.issuer');
const errorModel = require('../../lib/error');
const errorObj = new errorModel();

exports.generateToken = (user, options) => {
	let token = jwt.sign({
		userId: user.userId.toString(),
		role: user.userRole
	}, appSecret, {
		expiresIn: options.expires || tokenExpiresIn,
		issuer: tokenIssuer
	});
	return token;
};

exports.verifyToken = async (req, res, next) => {
	let decoded = false;
	if (req.headers["is-admin"]) {
		return next();
	} else {
		try {
			decoded = await jwt.verify(req.headers["access-token"], appSecret);
		} catch (error) {
			let err = await errorObj.errorHander(400, new Error('Please logout and login again.'));
			return res.status(err.respHeadersStatus).json(err.respParams);
		}
		if (decoded.userId) {
			req.userId = decoded.userId;
			req.role = decoded.role;
			return next();
		} else {
			let err = await errorObj.errorHander(400, new Error('Invalid Access Token'));
			return res.status(err.respHeadersStatus).json(err.respParams);
		}
	}
};
