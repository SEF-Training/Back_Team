exports.calculateEndDate = (startDate, duration) => {
	if (!duration || isNaN(parseInt(duration))) return null;

	const endDate = new Date(startDate);

	if (duration?.toLowerCase()?.includes('month')) {
		endDate.setMonth(endDate.getMonth() + parseInt(duration));
	} else if (duration?.toLowerCase()?.includes('week')) {
		endDate.setHours(endDate.getHours() + parseInt(duration) * 7 * 24);
	} else if (duration?.toLowerCase()?.includes('day')) {
		endDate.setHours(endDate.getHours() + parseInt(duration) * 24);
	} else if (duration?.toLowerCase()?.includes('hour')) {
		endDate.setHours(endDate.getHours() + parseInt(duration));
	}

	return endDate;
};
