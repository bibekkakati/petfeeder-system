const release_food = require("../helper/release_food");

const handleFeed = (req, res) => {
	const { id, quantity } = req.body;
	if (!quantity || (quantity <= 0 && quantity > 1000)) {
		return res.send({
			success: false,
			message: "Please select quantity in range!",
		});
	}
	release_food(id, quantity);
	return res.send({
		success: true,
	});
};

module.exports = handleFeed;
