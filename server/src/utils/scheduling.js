const cron = require('node-cron');
const { autoUpdateCourseStatus } = require('../controllers/course.controller');
const { autoUpdateArticleStatus } = require('../controllers/article.controller');

// run schedule daily at 12AM
cron.schedule(
	'0 0 * * *',
	() => {
		// update course status from upcoming' or 'ongoing'  to 'ongoing', 'ended'
		autoUpdateCourseStatus();

		// update Article isPublished from false 'draft' to true 'published'
		autoUpdateArticleStatus();
	},
	{ timezone: 'Egypt/Cairo' }
);
