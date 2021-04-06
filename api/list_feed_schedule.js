const { getScheduledJob } = require("./../helper/job_scheduler");

const handleListFeedSchedule = (req, res) => {
	const id = req.body.id;
	const scheduledJob = getScheduledJob(id);
	if (scheduledJob) {
		let date = scheduledJob.nextInvocation();
		return res.send({
			success: true,
			id: scheduledJob.name,
			date: date.toISOString(),
		});
	}
	return res.send({
		success: false,
		message: "No PawFeed schedule found!",
	});
};

module.exports = handleListFeedSchedule;
