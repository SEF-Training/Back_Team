const Exam = require('../models/exam.model');
const Course = require('../models/courses.model');
const asyncHandler = require('express-async-handler');
const { infoLogger } = require('../services/infoLoggerService');
const { paginate } = require('../utils/pagination3');
const { calculateEndDate } = require('../utils/calculateEndDate');
const { enum_examsStatus } = require('../config/enums');

const examController = {
	getAllExams: asyncHandler(async (req, res) => {
		const userRole = req.user?.role;

		let queryRole = {};

		if (userRole == 'Admin') {
			queryRole = {};
		} else if (userRole == 'Instructor') {
			queryRole = { Instructor: req.user._id };
		} else {
			let courses = await Course.find({ 'enrolledStudents.student': req.user?._id });
			var coursesIds = [...courses].map((course) => course._id);
			queryRole = { course: { $in: coursesIds } };
		}

		// populateOptions ---------------
		const populateOptions = {
			path: 'Instructor course',
			select: 'firstName lastName name',
		};
		// {
		// 	path: 'course',
		// 	select: 'name Instructor',
		// 	populate: {
		// 		path: 'Instructor',
		// 		model: 'User',
		// 		select: 'firstName lastName -_id',
		// 	},
		// };

		const { error, data, pagination } = await paginate(
			Exam,
			req,
			queryRole,
			populateOptions
		);
		if (error) {
			return res.status(404).json({ success: false, error });
		}

		res.status(200).json({ success: true, data, pagination });
	}),

	getExam: asyncHandler(async (req, res) => {
		const { id } = req.params;
		const userRole = req.user?.role;

		let queryRole = {};
		if (userRole == 'Admin') {
			queryRole = {};
		} else if (userRole == 'Instructor') {
			queryRole = { Instructor: req.user._id };
		} else {
			let course = await Course.findOne({ 'enrolledStudents.student': req.user?._id });
			queryRole = { course: course?._id };
		}

		const exam = await Exam.findOne({ _id: id, ...queryRole });
		if (!exam) {
			return res.status(404).json({
				success: false,
				error: 'Exam not found or you unauthorized to show this exam',
			});
		}

		res.status(200).json({ success: true, data: exam });
	}),

	createExam: asyncHandler(async (req, res) => {
		// check and set exam status
		const currentDate = Date.now();
		const endDate = calculateEndDate(req.body?.duration);
		console.log('endDate', endDate);
			const status = handelStatus(req.body?.date, req.body?.duration, enum_examsStatus);

		// if (new Date(req.body?.date) > currentDate) {
		// 	status = 'up coming';
		// } else if (
		// 	new Date(req.body?.date) <= currentDate &&
		// 	new Date(req.body?.date) < endDate
		// ) {
		// 	status = 'on going';
		// } else {
		// 	status = 'ended';
		// }
		// console.log('status', status);

		

		const newExam = await Exam.create({ ...req.body, status });
		if (!newExam) {
			return res.status(400).json({
				success: false,
				message: 'Something went wrong while create Exam',
			});
		}

		// add new exam _id to course.exams
		await Course.findByIdAndUpdate(
			{ _id: newExam?.course },
			{ $push: { exams: newExam._id } }
		);

		res.status(201).json({
			success: true,
			data: newExam,
			message: 'Exam was created successfully',
		});
		infoLogger.info(
			`Exam | ${newExam?._id} | Exam was created successfully by user ${req.user?._id}`
		);
	}),

	updateExam: asyncHandler(async (req, res) => {
		const { id } = req.params;

		const updatedExam = await Exam.findOneAndUpdate(
			{ _id: id, Instructor: req.user?._id },
			req.body,
			{ new: true }
		);

		if (!updatedExam) {
			return res.status(404).json({ success: false, error: 'Exam not found' });
		}

		res.status(201).send({
			success: true,
			data: updatedExam,
			message: 'Exam was updated successfully',
		});
		infoLogger.info(
			`Exam ${updatedExam?._id} | Exam was updated successfully by user ${req.user?._id}`
		);
	}),

	deleteExam: asyncHandler(async (req, res) => {
		const { id } = req.params;

		const deletedExam = await Exam.findOneAndDelete({
			_id: id,
			Instructor: req.user?._id,
		});

		if (!deletedExam) {
			return res.status(404).json({ success: false, error: 'Exam not found' });
		}

		res.status(201).json({
			success: true,
			message: 'Exam was deleted successfully',
		});
		infoLogger.info(
			`Exam ${deletedExam?._id} | Exam was deleted successfully by user ${req.user?._id}`
		);
	}),
};

module.exports = examController;

// ------------------------------------ auto Update status ------------------------
exports.autoUpdateExamStatus = async () => {
	const currentDate = new Date();
	try {
		const upcomingExams = await Exam.find({
			date: { $lte: currentDate },
			status: 'up coming',
		});

		if (!upcomingExams) return null;

		for (const exam in upcomingExams) {
			await Exam.findByIdAndUpdate(exam?._id, { $set: { status: 'on going' } });
			infoLogger.info(
				`exam ${exam?._id} | status auto updated from 'up coming' to 'on going'`
			);
		}

		// update ended status---------------------------
		const ongoingExams = await Exam.find({
			date: { $lte: currentDate },
			status: 'on going',
		});

		if (!ongoingExams) return null;

		for (const exam in ongoingExams) {
			const endDate = calculateEndDate(exam?.date, exam?.duration);
			if (currentDate >= new Date(endDate)) {
				await Exam.findByIdAndUpdate(exam?._id, { $set: { status: 'ended' } });
				infoLogger.info(
					`exam ${exam?.name} | ${exam?._id} | status auto updated 'on going' from to 'ended`
				);
			}
		}
	} catch (error) {
		if (process.env.NODE_ENV == 'development') {
			console.log('something went wrong while auto update exam Status', error);
		}
		errorLogger.error(
			'something went wrong while auto update exam Status' + error?.message
		);
	}
};
