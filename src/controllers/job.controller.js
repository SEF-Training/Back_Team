const Job = require('../models/job.model');
const asyncHandler = require('express-async-handler');
const { paginate } = require('../utils/pagination3');
exports.createJob = asyncHandler(async (req, res) => {
	const companyLogoPath = req.file ? `/jobs/${req.file.filename}` : null;

	const newJobData = {
		...req.body,
		companyLogo: companyLogoPath,
	};

	const newJob = await Job.create(newJobData);

	if (!newJob) {
		return res.status(500).send({
			success: false,
			message: 'Failed to create a new job',
		});
	}

	return res.status(200).send({
		success: true,
		message: 'New Job created successfully',
		data: newJob,
	});
});

exports.getJob = asyncHandler(async (req, res) => {
	const job = await Job.findById(req.params.id);
	if (!job) {
		return res.status(404).send({
			success: false,
			message: 'Job Not Found',
			data: job,
		});
	}
	return res.status(200).send({
		success: true,
		message: 'Job found successfully',
		data: job,
	});
});

exports.getAllJobs = asyncHandler(async (req, res) => {
	const { role } = req.user;

	let query = {};

	if (role === 'Admin') {
		query = {};
	} else if (role === 'Student') {
		query = { isAvailable: true };
	}

	const { error, data, pagination } = await paginate(Job, req, query);
	const locations = await Job.distinct('location');

	if (error) {
		return res.status(404).json({ success: false, error });
	}

	res.status(200).json({ success: true, pagination, data, locations });
});

exports.deleteJob = asyncHandler(async (req, res) => {
	const job = await Job.findByIdAndDelete(req.params.id);
	if (!job) {
		return res.status(404).send({
			success: false,
			message: 'Job Not Found',
			data: job,
		});
	}
	return res.status(200).send({
		success: true,
		message: 'Job deleted successfully',
		data: job,
	});
});
exports.updateJob = asyncHandler(async (req, res) => {
	if (req.file) {
		req.body.companyLogo = `/jobs/${req.file.filename}`;
	}

	try {
		const updatedJob = await Job.findByIdAndUpdate(
			req.params.id,
			{ ...req.body },
			{ new: true }
		);

		if (!updatedJob) {
			return res.status(404).send({
				success: false,
				message: 'Job Not Found',
				data: updatedJob,
			});
		}

		return res.status(200).send({
			success: true,
			message: 'Job updated successfully',
			data: updatedJob,
		});
	} catch (error) {
		console.error('Error updating job:', error);
		return res.status(500).send({
			success: false,
			message: 'Internal Server Error',
		});
	}
});
