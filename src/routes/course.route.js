const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/uploadMiddleware');
const {
	newCourseValidation,
	updateCourseValidation,
} = require('../validation/course.validation');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const {
	createCourse,
	getAllCourses,
	getSingleCourse,
	updateCourse,
	deleteCourse,
	instructorGetCourses,
	instructorGetCourse,
	studentGetCourses,
	studentGetCourse,
} = require('../controllers/course.controller');
const {
	authorizeAdmin,
	authorizeInstructor,
	authorizeStudent,
} = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');

// -------------------------------------- Admin routes ----------------------
router
	.route('/admin')
	.all(authorizeAdmin)
	.post(upload.single('image'), validationMiddleware(newCourseValidation), createCourse)
	.get(getAllCourses);

// single course operations --
router
	.route('/admin/:id')
	.all(authorizeAdmin, validateObjectId)
	.get(getSingleCourse)
	.patch(
		upload.single('image'),
		validationMiddleware(updateCourseValidation),
		updateCourse
	)
	.delete(deleteCourse);

// -------------------------------------- instructor routes ----------------------
router.get('/instructor', authorizeInstructor, instructorGetCourses);
router.get('/instructor/:id', authorizeInstructor, instructorGetCourse);

// -------------------------------------- student routes ----------------------
router.get('/student', authorizeStudent, studentGetCourses);
router.get('/student/:id', authorizeStudent, studentGetCourse);

module.exports = router;
