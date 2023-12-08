const Application = require('../models/applications.model');
const asyncHandler = require('express-async-handler');
const { paginate } = require('../utils/pagination3');
const { infoLogger } = require('../services/infoLoggerService');
const Job = require('../models/job.model');
const { User } = require('../models/user.model');

exports.getAllapplications = asyncHandler(async (req, res) => {
	const { error, data, pagination } = await paginate(Application, req);
	if (error) return res.status(404).json({ success: false, error });
	res.status(200).json({ success: true, pagination, data });
});
exports.createApplication = asyncHandler(async (req, res) => {
	if (req.file) {
		req.body.cv = `/applications/${req.file.filename}`;
	}
	const jobExist = await User.find({ _id: req.user?._id, applicantFor: req.body?.job });
	if (jobExist) {
		return res
			.status(400)
			.json({ success: false, message: 'You have already applied for this job' });
	}

	console.log('req.body', req.body);
	const newApplication = await Application.create(req.body);
	if (!newApplication) {
		return res.status(400).send({
			success: false,
			message: 'Application Creation Failed Please try again',
		});
	}
	// add new application _id to job.applications
	await Job.findByIdAndUpdate(
		{ _id: newApplication?.job },
		{ $push: { applications: newApplication._id } }
	);

	await User.findByIdAndUpdate(
		{ _id: req.user?._id },
		{ $push: { applicantFor: newApplication?.job } }
	);
	res.status(201).send({
		success: true,
		data: newApplication,
		message: 'Applied successfully',
	});
	infoLogger.info(
		`New application is Applied: ${newApplication?._id} by | ${req.user?._id} `
	);
});
exports.updateApplication = asyncHandler(async (req, res) => {
	if (req.file) {
		req.body.cv = `/applications/${req.file.filename}`;
	}
	const application = await Application.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	if (!application) {
		return res.status(404).send({ success: false, message: 'Application not found!' });
	}
	res.status(200).send({
		success: true,
		message: 'Application updated successfully',
		data: application,
	});
	infoLogger.info(
		`Application ${application?._id} was updated successfully by | ${req.user?._id}`
	);
});
exports.deleteApplication = asyncHandler(async (req, res) => {
	const application = await Application.findByIdAndDelete(req.params.id);
	if (!application) {
		return res.status(404).send({ success: false, message: 'application not found!' });
	}
	res.status(200).send({
		success: true,
		message: `application ${application?._id} deleted successfully`,
	});
	infoLogger.info(
		`application  ${application?._id} was deleted successfully by ${req.user?._id}`
	);
});
