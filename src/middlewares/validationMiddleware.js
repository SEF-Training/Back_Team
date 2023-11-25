  const validationMiddleware = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorDetails = error.details.map((err) => ({
          message: err.message,
          path: err.path,
        }));
        return res.status(400).json({ success: false, error: errorDetails });
      }
      next();
    };
  };
  
  module.exports = { validationMiddleware };