const ConnectionStore = require("../store/ConnectionStore");

const handleSocketState = (req, res) => {
	let id = req.body.id;
	let socket = ConnectionStore.get(id);
	if (socket) {
		return res.send({
			success: true,
			active: true,
		});
	}
	return res.send({
		success: true,
		active: false,
	});
};

module.exports = handleSocketState;
