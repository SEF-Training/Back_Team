const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/uploadMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { authorizeAdmin, authorizeStudent } = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const { newCertificateValidation, updateCertificateValidation } = require('../validation/certificate.validation');
const { studentGetCertificates, deleteCertificate, updateCertificate, getSingleCertificate, getAllCertificate, createCertificate } = require('../controllers/certificate.controller');


// -------------------------------------- Admin routes ----------------------
router
	.route('/admin')
	.all(authorizeAdmin)
	.post(
		upload.single('certificate_file'),
		validationMiddleware(newCertificateValidation),
		createCertificate
	)
	.get(getAllCertificate);

// single course operations --
router
	.route('/admin/:_id')
	.all(authorizeAdmin, validateObjectId)
	.get(getSingleCertificate)
	.patch(
		upload.single('certificate_file'),
		validationMiddleware(updateCertificateValidation),
		updateCertificate
	)
	.delete(deleteCertificate);


// -------------------------------------- student routes ----------------------
router.get('/student', authorizeStudent, studentGetCertificates);

module.exports = router;