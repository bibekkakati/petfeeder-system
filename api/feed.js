const release_food = require("../helper/release_food");

const handleFeed = (req, res) => {
	let { id, quantity } = req.body;
	try {
		quantity = parseInt(quantity);
		if (isNaN(quantity) || !quantity || quantity < 50 || quantity > 900) {
			throw new Error("Invalid quantity!");
		}
	} catch (error) {
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
