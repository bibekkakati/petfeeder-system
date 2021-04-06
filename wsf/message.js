const release_food = require("../helper/release_food");
const ConnectionStore = require("../store/ConnectionStore");
const SignalStore = require("../store/SignalStore");

const handleMessage = (socket, msg) => {
	let data = msg.split(":");
	if (data[0] == "CONNECTION") {
		ConnectionStore.add(data[1], socket);
		let signal = SignalStore.get(data[1]);
		if (signal.signalName == "TURN_MOTOR") {
			release_food(data[1], signal.quantity);
		}
	}
	return data[1] || undefined;
};

module.exports = handleMessage;
