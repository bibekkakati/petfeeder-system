const scheduler = require("node-schedule");

const schedule = (id, date, callback) => {
	try {
		scheduler.scheduleJob(id, date, callback);
		return true;
	} catch (error) {
		return false;
	}
};

const deschedule = (id) => {
	try {
		const scheduledJob = getScheduledJob(id);
		if (scheduledJob) {
			return scheduler.cancelJob(scheduledJob);
		}
		return false;
	} catch (error) {
		return false;
	}
};

const reschedule = (id, date) => {
	try {
		const scheduledJob = getScheduledJob(id);
		if (scheduledJob) {
			scheduler.rescheduleJob(scheduledJob, date);
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
};

const getScheduledJob = (id) => {
	try {
		const scheduledJobs = scheduler.scheduledJobs;
		if (scheduledJobs.hasOwnProperty(id)) {
			return scheduledJobs[id];
		}
		return false;
	} catch (error) {
		return false;
	}
};

module.exports = {
	deschedule,
	schedule,
	reschedule,
	getScheduledJob,
};
