const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync("./keys/public.key");
const verify_token = (token, id) => {
	try {
		jwt.verify(token, publicKey, { issuer: "PawFeeder", jwtid: id });
		return true;
	} catch (error) {
		return false;
	}
};

module.exports = verify_token;
