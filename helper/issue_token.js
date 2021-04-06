const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("./keys/private.key");
const issue_token = (id) => {
	try {
		const token = jwt.sign({}, privateKey, {
			algorithm: "RS256",
			expiresIn: 60 * 60 * 24 * 30,
			issuer: "PawFeeder",
			jwtid: id,
		});
		return token || true;
	} catch (error) {
		return false;
	}
};
module.exports = issue_token;
