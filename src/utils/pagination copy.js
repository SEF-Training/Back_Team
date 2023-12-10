async function paginate(model, req, quire = {}, populateOptions = null) {
	const page = +req.query.page || 1;
	const limit = +req.query.limit || 10;
	const startIndex = (page - 1) * limit;
	const totalDocs = await model.countDocuments(quire);
	const pagination = {};
	if (startIndex > totalDocs) return { error: 'Page not found' };
	pagination.total = totalDocs;
	pagination.limit = limit;
	pagination.page = page;
	pagination.pages = Math.ceil(totalDocs / limit);

	let query = model.find(quire).limit(limit).skip(startIndex).sort({ createdAt: -1 });

	if (populateOptions) {
		query = query.populate(populateOptions);
	}

	const data = await query.exec();
	return { data, pagination };
}

module.exports = { paginate };
