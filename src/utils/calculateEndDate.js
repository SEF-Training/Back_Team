exports.calculateEndDate = (startDate, duration) => {
	if (!duration || isNaN(parseInt(duration))) return null;

	const endDate = new Date(startDate);

	console.log('endDate1:', endDate);
	if (duration.includes('month')) {
		endDate.setMonth(endDate.getMonth() + parseInt(duration));
	} else if (duration.includes('week')) {
		endDate.setHours(endDate.getHours() + parseInt(duration) * 7 * 24);
	} else if (duration.includes('day')) {
		endDate.setHours(endDate.getHours() + parseInt(duration) * 24);
	} else if (duration.includes('hour')) {
		endDate.setHours(endDate.getHours() + parseInt(duration));
	}
	console.log('endDate2:', endDate);

	return endDate;
};
