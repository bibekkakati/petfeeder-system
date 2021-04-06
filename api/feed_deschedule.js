const { deschedule } = require("../helper/job_scheduler");

const handleFeedDeSchedule = (req, res) => {
	const id = req.body.id;
	if (deschedule(id)) {
		return res.send({
			success: true,
			message: "PawFeed schedule is deleted!",
		});
	}
	return res.send({
		success: false,
		message: "PawFeed schedule deletion failed!",
	});
};

module.exports = handleFeedDeSchedule;
