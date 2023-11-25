const express = require('express');
const router = express.Router();
const { uploadFile } = require('../middlewares/uploadMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { authorizeAdmin, authenticate } = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const {
	newApplicationValidation,
	updateApplicationValidation,
} = require('../validation/application.validation');
const {
	createApplication,
	getAllapplications,
	updateApplication,
	deleteApplication,
} = require('../controllers/application.controller');

// -------------------------------------- Application routes ----------------------
router
	.route('/')
	.post(
		uploadFile.single('cv'), // allow upload images/files-pdf,doc.docx
		authenticate,
		validationMiddleware(newApplicationValidation),
		createApplication
	)
	.get(authorizeAdmin, getAllapplications);

router
	.route('/:id')
	.all(authorizeAdmin, validateObjectId)
	.patch(
		uploadFile.single('cv'), // allow upload images/files-pdf,doc.docx
		validationMiddleware(updateApplicationValidation),
		updateApplication
	)
	.delete(deleteApplication);

module.exports = router;
