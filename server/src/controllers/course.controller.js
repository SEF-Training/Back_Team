const Course = require('../models/courses.model');
const asyncHandler = require('express-async-handler');
// const loggerEvent = require('../services/logger.services');
// const logger = loggerEvent('courses');

//************ */ courses/ router ---------------------------------
// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
exports.getAllCourses = asyncHandler(async (req, res) => {
	res.status(200).json(await Course.find());
});

// @desc    Create new course
// @route   GET /api/courses
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
// @route   GET /api/courses/:id
// @access  Private
exports.getSingleCourse = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params.id);
	if (!course) {
      
		throw new Error('This course not found');
	}
	res.status(200).send({ success: true, data: course });
});

// @desc    Update course by ID
// @route   Patch /api/courses/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res) => {
   console.log('req.body', req.body);
   const course = await Course.findByIdAndUpdate(req.params.id,req.body,{new:true})
   if(!course){
      throw new Error("No course found");
      }
      res.status(200).send({success:true, message:'Course updated successfully', data:course})

});

// @desc    Delete course by ID
// @route   DELETE /api/courses/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res) => {});
