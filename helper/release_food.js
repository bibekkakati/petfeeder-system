const ConnectionStore = require("../store/ConnectionStore");
const SignalStore = require("../store/SignalStore");
const MessagingTokenStore = require("../store/MessagingTokenStore");
const send_notification = require("./send_notification");

const release_food = (id, quantity = 100) => {
	let socket = ConnectionStore.get(id);
	const signalName = "TURN_MOTOR:" + quantity;
	if (socket) {
		socket.send(signalName, (err) => {
			if (err) {
				SignalStore.add(id, "TURN_MOTOR", quantity);
			} else {
				const token = MessagingTokenStore.get(id);
				if (token) {
					send_notification(token);
				}
				SignalStore.clear(id);
			}
		});
	} else {
		SignalStore.add(id, "TURN_MOTOR", quantity);
	}
	return true;
};

module.exports = release_food;
