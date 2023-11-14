const express = require('express');
const router = express.Router();
const courseValidation = require('../validation/course.validation');
const { upload } = require('../middlewares/uploadMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const {
	createCourse,
	getAllCourses,
	getSingleCourse,
	updateCourse,
	deleteCourse,
} = require('../controllers/course.controller');
const {
	authorizeAdmin,
	authorizeInstructor,
} = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');

// only admin has authorize
router.use(authorizeAdmin);

// courses operations
router
	.route('/')
	.post(validationMiddleware(courseValidation), upload.single('image'), createCourse)
	.get(getAllCourses);

// single course operations ----------------------------------
router
	.route('/:id', validateObjectId)
	.get(getSingleCourse)
	.patch(validationMiddleware(courseValidation), upload.single('image'), updateCourse)
	.delete(deleteCourse);

module.exports = router;
