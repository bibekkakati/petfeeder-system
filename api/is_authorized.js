const handleIsAuthorized = (req, res) => {
	if (req.body.id && req.headers.authorization) {
		return res.send({
			success: true,
		});
	}
	return res.send({
		success: false,
		action: "LOGOUT",
	});
};

module.exports = handleIsAuthorized;
