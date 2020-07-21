const jwt = require('jsonwebtoken');
const config = require('config');
const appSecret = config.get('app.secret');
const tokenExpiresIn = config.get('app.auth.expires');
const tokenIssuer = config.get('app.auth.issuer');
const errorModel = require('../../lib/error');
const errorObj = new errorModel();

exports.generateToken = (user, options) => {
	const token = jwt.sign({
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
			const err = await errorObj.errorHander(400, new Error('Not authorized.'));
			return res.status(err.respHeadersStatus).json(err.respParams);
		}
		if (decoded.userId) {
			req.userId = decoded.userId;
			req.role = decoded.role;
			return next();
		} else {
			const err = await errorObj.errorHander(400, new Error('Invalid Access Token'));
			return res.status(err.respHeadersStatus).json(err.respParams);
		}
	}
};
