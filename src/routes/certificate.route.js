const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../middlewares/uploadMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { authorizeAdmin, authenticate } = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const { newCertificateValidation, updateCertificateValidation } = require('../validation/certificate.validation');
const { studentGetCertificates, deleteCertificate, updateCertificate, getSingleCertificate, getAllCertificate, createCertificate } = require('../controllers/certificate.controller');


// -------------------------------------- Admin routes ----------------------
router
	.route('/admin')
	.all(authorizeAdmin)
	.post(
		uploadFile.single('certificate_file'), // allow upload images/files-pdf,doc.docx
		validationMiddleware(newCertificateValidation),
		createCertificate
	)
	.get(getAllCertificate);

// single course operations --
router
	.route('/admin/:id')
	.all(authorizeAdmin, validateObjectId)
	.get(getSingleCertificate)
	.patch(
		uploadFile.single('certificate_file'), // allow upload images/files-pdf,doc.docx
		validationMiddleware(updateCertificateValidation),
		updateCertificate
	)
	.delete(deleteCertificate);


// -------------------------------------- student routes ----------------------
router.get('/student', authenticate, studentGetCertificates);

module.exports = router;