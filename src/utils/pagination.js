async function paginate(model, req) {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const startIndex = (page - 1) * limit;
    const { fieldName, fieldValue, searchBy, searchValue } = req.query;
    console.log({ fieldName, fieldValue, searchBy, searchValue })
    const dynamicQuery = fieldValue && fieldName ? { [fieldName]: fieldValue } : {};
    const searchQuery = searchBy ? { [searchBy]: { $regex: new RegExp(searchValue, 'i') } } : {};
    const transformedQuery = { ...dynamicQuery, ...searchQuery };
    const totalDocs = await model.countDocuments(transformedQuery);
    const pagination = { total: totalDocs, limit, page, pages: Math.ceil(totalDocs / limit) };
  console.log({transformedQuery,totalDocs})
    if (startIndex > totalDocs) { return { error: 'Page not found' }; }
    const data = await model.find({ ...transformedQuery, _id: { $ne: req.user._id } })
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: -1 });
  
    return { data, pagination };
  }
module.exports = { paginate }
