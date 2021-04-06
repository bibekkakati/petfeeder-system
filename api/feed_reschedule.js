const { reschedule } = require("../helper/job_scheduler");

const handleFeedReSchedule = (req, res) => {
	let { id, date } = req.body;
	if (!date) {
		return res.send({
			success: false,
			message: "Please select a date!",
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
		if (reschedule(id, date)) {
			return res.send({
				success: true,
				message: "PawFeed has been rescheduled!",
				date: date,
			});
		}
		return res.send({
			success: false,
			message: "Couldn't reschedule PawFeed!",
		});
	} else {
		return res.send({
			success: false,
			message: "Please select a valid date!",
		});
	}
};

module.exports = handleFeedReSchedule;
