const MessagingTokenStore = require("../store/MessagingTokenStore");

const handleNotificationToken = (req, res) => {
	const { id, fcmToken } = req.body;
	if (id && fcmToken) {
		MessagingTokenStore.add(id, fcmToken);
		return res.send({
			success: true,
		});
	}
	return res.send({
		success: true,
	});
};

module.exports = handleNotificationToken;
