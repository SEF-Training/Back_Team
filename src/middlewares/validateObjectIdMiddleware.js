const mongoose = require('mongoose');
function validateObjectId(req, res, next) {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({success:false, error: 'Invalid object ID' });
  }
  next();
}

module.exports = validateObjectId;