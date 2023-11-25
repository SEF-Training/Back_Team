const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/uploadMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const {
	authenticate,
	authorizeInstructor,
} = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const examController = require('../controllers/exam.controller');
const {
	newExamValidation,
	updateExamValidation,
} = require('../validation/exam.validation');

// -------------------------------------- all articles routes ----------------------
router.post(
	'/',
	authorizeInstructor,
	validationMiddleware(newExamValidation),
	examController.createExam
);
router.get('/', authenticate, examController.getAllExams);

// single articles routes operations --
router.get('/:id', authenticate, validateObjectId, examController.getExam);

router
	.route('/:id')
	.all(authorizeInstructor, validateObjectId)
	.patch(validationMiddleware(updateExamValidation), examController.updateExam)
	.delete(examController.deleteExam);

module.exports = router;
