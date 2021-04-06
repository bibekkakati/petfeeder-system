const verify_token = require("../helper/verify_token");

const authorize = (req, res, next) => {
	const token = req.headers.authorization;
	const id = req.body.id;
	if (id && token) {
		if (verify_token(token, id)) {
			return next();
		}
	}
	return res.send({
		success: false,
		action: "LOGOUT",
	});
};

module.exports = authorize;
