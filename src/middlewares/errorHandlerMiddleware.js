const { errorLogger } = require("../services/errorLoggerService");
const errorHandler = (err, req, res, next) => {
  errorLogger.error(err)
  res.status(500).json({ success: false, error: 'Server error!!!' });
}
module.exports= {errorHandler}