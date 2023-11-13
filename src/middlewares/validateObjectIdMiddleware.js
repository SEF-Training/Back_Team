const mongoose = require('mongoose');
function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({success:false, error: 'Invalid object ID' });
  }
  next();
}

module.exports = validateObjectId;