var admin = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const send_notification = (registrationToken) => {
	const message = {
		notification: {
			title: "Hey! Hooman",
			body: "Eating my food...Yummy! 🐶",
		},
		token: registrationToken,
		data: {
			sound: "default",
			clickAction: "FLUTTER_NOTIFICATION_CLICK",
		},
		android: {
			ttl: 24 * 60 * 60 * 1000,
			notification: {
				sound: "default",
			},
		},
	};
	admin
		.messaging()
		.send(message)
		.then((response) => {})
		.catch((error) => {
			console.error("Error sending message:", error);
		});
};

module.exports = send_notification;
