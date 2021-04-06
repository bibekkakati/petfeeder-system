const { schedule } = require("../helper/job_scheduler");
const release_food = require("../helper/release_food");

const handleFeedSchedule = (req, res) => {
	let { id, date, quantity } = req.body;
	if (!quantity) {
		return res.send({
			success: false,
			message: "Please select a quantity!",
		});
	}
	if (!date) {
		return res.send({
			success: false,
			message: "Please select a date!",
		});
	}
	if (!date || !quantity) {
		return res.send({
			success: false,
			message: "Date/Time and Quantity is required!",
		});
	}
	try {
		quantity = parseInt(quantity);
		if (isNaN(quantity) || quantity < 50 || quantity > 900) {
			throw new Error("Invalid quantity!");
		}
	} catch (error) {
		return res.send({
			success: false,
			message: "Please select quantity in range!",
		});
	}
	try {
		date = new Date(date);
	} catch (error) {
		return res.send({
			success: false,
			message: "Invalid date format!",
		});
	}
	if (date.getTime() > Date.now()) {
		let scheduledJob = schedule(id, date, () => {
			release_food(id, quantity);
		});
		if (scheduledJob) {
			return res.send({
				success: true,
				message: "PawFeed has been scheduled!",
				date: date,
			});
		}
		return res.send({
			success: false,
			message: "Couldn't schedule PawFeed!",
		});
	} else {
		return res.send({
			success: false,
			message: "Please select a valid date!",
		});
	}
};

module.exports = handleFeedSchedule;
