const { calculateEndDate } = require('./calculateEndDate');

exports.handelStatus = (date, duration, enums = ['up coming', 'on going', 'ended']) => {
	const currentDate = Date.now();
	const endDate = calculateEndDate(date, duration);

	let status = '';
	if (new Date(date) > currentDate) {
		status = enums[0] || 'up coming';
	} else if (new Date(date) <= currentDate && new Date(date) < endDate) {
		status = enums[1] || 'on going';
	} else {
		status = enums[2] || 'ended';
	}
	return status;
};
