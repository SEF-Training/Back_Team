const Joi = require('joi');

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

	// --------------------------------------
	course: Joi.string(),

	Instructor: Joi.string(),
});

module.exports = { newExamValidation, updateExamValidation };
