const Joi = require('joi');
const { enum_examsStatus } = require('../config/enums');

const newExamValidation = Joi.object({
	date: Joi.date().required().messages({
		'any.required': 'Please provide a duration for this Exam',
	}),
	duration: Joi.string().required().messages({
		'any.required': 'Please provide a duration for this Exam',
	}),

	link: Joi.string().uri().required().messages({
		'any.required': 'Please provide a duration for this Exam',
	}),
	photo: Joi.string(),

	status: Joi.string()
		.valid(...enum_examsStatus)
		.default(enum_examsStatus[0])
		.trim()
		.messages({
			'any.only': `Must be one of the following values: ${enum_examsStatus}`,
		}),

	// --------------------------------------
	course: Joi.string()
		.required()
		.messages({ 'any.required': 'Please select the course' }),

	Instructor: Joi.string()
		.required()
		.messages({ 'any.required': 'Please select the Instructor' }),
});

const updateExamValidation = Joi.object({
	date: Joi.date(),

	duration: Joi.string(),

	link: Joi.string().uri(),

	photo: Joi.string(),

	status: Joi.string()
		.valid(...enum_examsStatus)
		.trim()
		.messages({
			'any.only': `Must be one of the following values: ${enum_examsStatus}`,
		}),
	// --------------------------------------
	course: Joi.string(),

	Instructor: Joi.string(),
});

module.exports = { newExamValidation, updateExamValidation };
