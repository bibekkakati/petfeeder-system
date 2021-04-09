var admin = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const payload = {
	notification: {
		title: "Hey! Hooman",
		body: "Eating my food...Yummy! 🐶",
	},
};

const options = {
	priority: "high",
	timeToLive: 60 * 60 * 24,
};

const send_notification = (registrationToken) => {
	admin
		.messaging()
		.sendToDevice(registrationToken, payload, options)
		.then((response) => {
			console.log("Successfully sent message:", response);
		})
		.catch((error) => {
			console.log("Error sending message:", error);
		});
};

module.exports = send_notification;
