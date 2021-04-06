const ConnectionStore = require("../store/ConnectionStore");
const SignalStore = require("../store/SignalStore");

const release_food = (id, quantity = 100) => {
	let socket = ConnectionStore.get(id);
	const signalName = "TURN_MOTOR:" + quantity;
	if (socket) {
		socket.send(signalName, (err) => {
			if (err) {
				SignalStore.add(id, "TURN_MOTOR", quantity);
			} else {
				// notify user that food has beend released
				SignalStore.clear(id);
			}
		});
	} else {
		SignalStore.add(id, "TURN_MOTOR", quantity);
	}
	return true;
};

module.exports = release_food;
