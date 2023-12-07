async function paginate(model, req, quire = {}, populateOptions = null) {
	const page = +req.query.page || 1;
	const limit = +req.query.limit || 10;
	const startIndex = (page - 1) * limit;
	const { filter = {}, searchBy = '', searchValue = '' } = req.query;

	const searchQuery = searchValue
		? { [searchBy]: { $regex: new RegExp(searchValue, 'i') } }
		: {};

	console.log('req.query p', req.query);
	console.log('quire p', quire);
	console.log('filter p', filter);
	console.log('searchQuery p', searchQuery);
	
	const transformedQuery = { ...quire, ...filter, ...searchQuery };
	delete transformedQuery.page;
	delete transformedQuery.limit;
	console.log('transformedQuery p', transformedQuery);

	const totalDocs = await model.countDocuments(transformedQuery);
	const pagination = {};
	if (startIndex > totalDocs) return { error: 'Page not found' };
	pagination.total = totalDocs;
	pagination.limit = limit;
	pagination.page = page;
	pagination.pages = Math.ceil(totalDocs / limit);
	let query = model
		.find({ ...transformedQuery, _id: { $ne: req.user._id } })
		// .find(transformedQuery)
		.limit(limit)
		.skip(startIndex)
		.sort({ createdAt: -1 });
	// .exec();

	if (populateOptions) {
		query = query.populate(populateOptions);
	}

	const data = await query.exec();
	return { data, pagination };
}
module.exports = { paginate };
