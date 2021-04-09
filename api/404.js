const path = require("path");

const handle404 = (req, res) => {
	return res.status(404).send("Not Found");
};

module.exports = handle404;
