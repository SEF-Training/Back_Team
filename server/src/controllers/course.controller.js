const Course = require('../models/courses.model');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const { paginate } = require('../utils/pagination');
const { calculateEndDate } = require('../utils/calculateEndDate');
// const loggerEvent = require('../services/logger.services');
// const logger = loggerEvent('courses');

//************ */ courses/ router ---------------------------------
// @desc    Get all courses
// @route   GET /api/courses/admin
// @access  Private-admin
exports.getAllCourses = asyncHandler(async (req, res) => {
	const { error, data, pagination } = await paginate(Course, req);
	if (error) return res.status(404).json({ success: false, error });
	res.status(200).json({ success: true, pagination, data });
});

// @desc    Create new course
// @route   GET /api/courses/admin
// @access  Private
exports.createCourse = asyncHandler(async (req, res) => {
	const newCourse = await Course.create(req.body);
	if (newCourse) {
		// logger.info(`Created a new course with id: ${newCourse._id}`);
		res.status(201).send({
			success: true,
			message: 'New course created',
			data: newCourse,
		});
	}
});

//************ *courses/:id router ---------------------------------
// @desc    Get single course by ID
// @route   GET /api/courses/admin/:id
// @access  Private-admin
exports.getSingleCourse = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params._id);
	if (!course) {
		return res.status(404).send({ success: false, message: 'course not found!' });
	}
	res.status(200).send({ success: true, data: course });
});

// @desc    Update course by ID
// @route   Patch /api/courses/admin/:id
// @access  Private-admin
exports.updateCourse = asyncHandler(async (req, res) => {
	if (req.file) {
		req.body.image = `/courses/${req.file.filename}`;
	}
	const course = await Course.findByIdAndUpdate(req.params._id, req.body, { new: true });
	if (!course) {
		return res.status(404).send({ success: false, message: 'course not found!' });
	}
	res.status(200).send({
		success: true,
		message: 'Course updated successfully',
		data: course,
	});
});

// @desc    Delete course by ID
// @route   DELETE /api/courses/admin/:id
// @access  Private-admin
exports.deleteCourse = asyncHandler(async (req, res) => {
	const course = await Course.findByIdAndDelete(req.params._id);
	if (!course) {
		return res.status(404).send({ success: false, message: 'course not found!' });
	}
	res.status(200).send({
		success: true,
		message: `Course ${course?.name} deleted successfully`,
	});
});

// -----------------------------------------  controller authorize instructor -------------
// @desc    Authorize Instructor for a course
// @route   POST /api/courses/instructor
// @access  Private-instructor
exports.instructorGetCourses = asyncHandler(async (req, res) => {
	const { error, data, pagination } = await paginate(Course, req, {
		Instructor: req.user._id,
	});
	if (error) return res.status(404).json({ success: false, message: error.message });

	res.status(200).send({ success: true, pagination, data });
});

// @desc    Authorize Instructor git his course
// @route   POST /api/courses/instructor/:_id
// @access  Private-instructor
exports.instructorGetCourse = asyncHandler(async (req, res) => {
	const course = await Course.findOne({
		_id: req.params?._id,
		Instructor: req.user?._id,
	}).populate('enrolledStudents.student', 'firstName lastName userId');

	if (!course) {
		return res.status(401).send({
			success: false,
			message: 'Unauthorized access! You are not the owner of this course.',
		});
	}
	res.status(200).send({ success: true, data: course });
});

// @desc		Authorize Student get his courses
// @route	GET /api/courses/student
// @access	Private-student
exports.studentGetCourses = asyncHandler(async (req, res) => {
	// const { error, data, pagination } = await paginate(Course, req, {
	// 	enrolledStudents: req.user._id,
	// });

	const courses = await Course.find({ enrolledStudents: req.user._id }).populate(
		'Instructor',
		'firstName lastName -_id'
	);
	if (!courses) {
		return res.status(404).json({ success: false, message: 'no courses found' });
	}

	res.status(200).send({ success: true, data: courses });
});

// @desc		Authorize Student get his course
// @route	GET /api/courses/student/:_id
// @access	Private-student
exports.studentGetCourse = asyncHandler(async (req, res) => {
	const course = await Course.findOne({
		_id: req.params._id,
		enrolledStudents: req.user._id,
	}).populate('Instructor', 'firstName lastName -_id');
	// .populate('enrolledStudents', 'firstName lastName -_id');

	if (!course) {
		return res.status(401).send({
			success: false,
			message: 'Unauthorized access! You are not a student in this course.',
		});
	}
	res.status(200).send({ success: true, data: course });
});

// ------------------------------------ auto Update status ------------------------
exports.autoUpdateCourseStatus = async () => {
	const currentDate = new Date();
	try {
		const upcomingCourses = await Course.find({
			start_date: { $lte: currentDate },
			status: 'upcoming',
		});

		if (!upcomingCourses) return null;

		for (const course in upcomingCourses) {
			await Course.findByIdAndUpdate(course?._id, { $set: { status: 'ongoing' } });
			infoLogger.info(
				`course ${course?.name} | ${course?._id} | status auto updated from 'upcoming' to 'ongoing'`
			);
		}

		// update ended status---------------------------
		const ongoingCourses = await Course.find({
			start_date: { $lte: currentDate },
			status: 'ongoing',
		});

		if (!ongoingCourses) return null;

		for (const course in ongoingCourses) {
			const endDate = calculateEndDate(course?.start_date, course?.duration);
			if (currentDate >= endDate) {
				await Course.findByIdAndUpdate(course?._id, { $set: { status: 'ended' } });
				infoLogger.info(
					`course ${course?.name} | ${course?._id} | status auto updated 'ongoing' from to 'ended`
				);
			}
		}
	} catch (error) {
		console.log('something went wrong while auto update course Status', error);
		errorLogger.error(
			'something went wrong while auto update course Status' + error?.message
		);
	}
};
