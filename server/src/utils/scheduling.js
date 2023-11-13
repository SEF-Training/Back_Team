const cron = require('node-cron');
const { autoUpdateCourseStatus } = require('../controllers/course.controller');

// run schedule daily at 12AM
cron.schedule(
	'0 0 * * *',
	() => {
		// update course status from upcoming' or 'ongoing'  to 'ongoing', 'ended'
		autoUpdateCourseStatus();
	},
	{ timezone: 'Egypt/Cairo' }
);
