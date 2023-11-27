async function paginate(model, req) {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const startIndex = (page - 1) * limit;
    const { fieldName, fieldValue, search } = req.query;
    console.log({ fieldName, fieldValue, search })
    const dynamicQuery = fieldValue && fieldName ? { [fieldName]: fieldValue } : {};
    const searchQuery = search
        ? { $or: [{ fieldName: { $regex: new RegExp(search, 'i') } }] }
        : {};
    const transformedQuery = { ...dynamicQuery, ...searchQuery };
    console.log(transformedQuery)
    const totalDocs = await model.countDocuments(transformedQuery);
    const pagination = {};
    if (startIndex > totalDocs) return { error: 'Page not found' }
    pagination.total = totalDocs;
    pagination.limit = limit;
    pagination.page = page;
    pagination.pages = Math.ceil(totalDocs / limit);
    const data = await model.find({...transformedQuery, _id: { $ne: req.user._id } }).limit(limit).skip(startIndex).sort({ createdAt: -1 }).exec();
    return { data, pagination }
}
module.exports = { paginate }