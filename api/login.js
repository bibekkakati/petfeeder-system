const issue_token = require("../helper/issue_token");
const CredentialStore = require("../store/CredentialStore");

const handleLogin = (req, res) => {
	const { id, password } = req.body;
	if (id && password && CredentialStore.verify(id, password)) {
		let token = issue_token(id);
		if (token) {
			return res.send({
				success: true,
				token: token,
			});
		}
	}
	return res.send({
		success: false,
	});
};

module.exports = handleLogin;
