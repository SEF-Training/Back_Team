const Certificate = require('../models/certificate.model');
const asyncHandler = require('express-async-handler');
const { paginate } = require('../utils/pagination');
const { infoLogger } = require('../services/infoLoggerService');

//************ */ certificate/ router ---------------------------------
// @desc    Get all certificate
// @route   GET /api/certificate/admin
// @access  Private-admin
exports.getAllCertificate = asyncHandler(async (req, res) => {
	const { error, data, pagination } = await paginate(Certificate, req);
	if (error) return res.status(404).json({ success: false, error });
	res.status(200).json({ success: true, pagination, data });
});

// @desc    Create new certificate
// @route   GET /api/certificate/admin
// @access  Private-admin
exports.createCertificate = asyncHandler(async (req, res) => {
	if (req.file) {
		req.body.certificate_file = `/certificates/${req.file.filename}`;
	}
	console.log('req.body', req.body);
	const newCertificate = await Certificate.create(req.body);
	if (!newCertificate) {
		return res.status(400).send({
			success: false,
			message: 'Something went wrong while creating certificate',
		});
	}
	res.status(201).send({
		success: true,
		data: newCertificate,
		message: 'New certificate created successfully',
	});
	infoLogger.info(
		`Created a new certificate with id: ${newCertificate?._id} by | ${req.user?._id} `
	);
});

//************ *certificate/:id router ---------------------------------
// @desc    Get single certificate by ID
// @route   GET /api/certificate/admin/:id
// @access  Private-admin
exports.getSingleCertificate = asyncHandler(async (req, res) => {
	const certificate = await Certificate.findById(req.params.id)
		.populate('student course', 'firstName lastName name Instructor');

	if (!certificate) {
		return res.status(404).send({ success: false, message: 'Certificate not found!' });
	}
	res.status(200).send({ success: true, data: certificate });
});

// @desc    Update certificate by ID
// @route   Patch /api/certificate/admin/:id
// @access  Private-admin
exports.updateCertificate = asyncHandler(async (req, res) => {
	if (req.file) {
		req.body.certificate_file = `/certificates/${req.file.filename}`;
	}
	const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	if (!certificate) {
		return res.status(404).send({ success: false, message: 'certificate not found!' });
	}
	res.status(200).send({
		success: true,
		message: 'Certificate updated successfully',
		data: certificate,
	});
	infoLogger.info(
		`certificate ${certificate?._id} was updated successfully by | ${req.user?._id}`
	);
});

// @desc    Delete certificate by ID
// @route   DELETE /api/certificate/admin/:id
// @access  Private-admin
exports.deleteCertificate = asyncHandler(async (req, res) => {
	const certificate = await Certificate.findByIdAndDelete(req.params.id);
	if (!certificate) {
		return res.status(404).send({ success: false, message: 'Certificate not found!' });
	}
	res.status(200).send({
		success: true,
		message: `certificate ${certificate?._id} deleted successfully`,
	});
	infoLogger.info(
		`certificate  ${certificate?._id} was deleted successfully by ${req.user?._id}`
	);
});

// @desc	Authorize Student get his certificate
// @route	GET /api/certificate/student
// @access	Private-student
exports.studentGetCertificates = asyncHandler(async (req, res) => {
	const certificates = await Certificate.find({ student: req.user._id }).populate(
		'course.Instructor',
		'firstName lastName -_id'
	);
	if (!certificates) {
		return res.status(404).json({ success: false, message: 'No certificate found' });
	}

	res.status(200).send({ success: true, data: certificates });
});
