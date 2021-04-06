const path = require("path");

const handle404 = (req, res) => {
	return res.sendFile(path.join(__dirname + "/../html/404.html"));
};

module.exports = handle404;
