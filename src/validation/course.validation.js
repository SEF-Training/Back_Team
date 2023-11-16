const Joi = require('joi');
const { enum_coursesStatus } = require('../config/enums');

const newCourseValidation = Joi.object({
	name: Joi.string().required().min(3).max(50).messages({
		'any.required': 'Please enter a course name',
		'any.min': 'Course name must be between 3 and 50 characters',
		'any.mix': 'Course name must be between 3 and 50 characters',
	}),
	level: Joi.number().required().min(1).max(10).integer().messages({
		'any.required': 'Please provide a course level',
		'any.min': 'Course level must be between 3 and 50 characters',
		'any.mix': 'Course level must be between 3 and 50 characters',
	}),
	status: Joi.string()
		.valid(...enum_coursesStatus)
		.required()
		.trim()
		.messages({
			'any.required': 'Please provide a status for this course',
			'any.only': `Must be one of the following values: ${enum_coursesStatus}`,
		}),
	sessions: Joi.number().required().integer().message('please provide sessions number'),
	languages: Joi.array().items(Joi.string().trim().required()),
	requirements: Joi.array().items(Joi.string()),
	assessments: Joi.array().items(Joi.string()),
	materials: Joi.array().items(Joi.string()),
	introduction: Joi.string(),
	image: Joi.string().trim(),
	certificate: Joi.boolean().required(),
	duration: Joi.string().required(),
	start_date: Joi.date()
		.required()
		.messages({ 'any.required': 'Please select the start date' }),
	publish_date: Joi.date().default(() => new Date()),
	Instructor: Joi.string()
		.required()
		.messages({ 'any.required': 'Please select the Instructor' }),
	enrolledStudents: Joi.array().items(Joi.object()),
	exams: Joi.array().items(Joi.string()),
});

const updateCourseValidation = Joi.object({
	name: Joi.string().min(3).max(50).messages({
		'any.min': 'Course name must be between 3 and 50 characters',
		'any.mix': 'Course name must be between 3 and 50 characters',
	}),
	level: Joi.number().min(1).max(10).integer().messages({
		'any.min': 'Course level must be between 3 and 50 characters',
		'any.mix': 'Course level must be between 3 and 50 characters',
	}),
	status: Joi.string()
		.valid(...enum_coursesStatus)
		.trim()
		.messages({
			'any.only': `Must be one of the following values: ${enum_coursesStatus}`,
		}),
	sessions: Joi.number().integer().message('please provide sessions number'),
	languages: Joi.array().items(Joi.string().trim()),
	requirements: Joi.array().items(Joi.string()),
	assessments: Joi.array().items(Joi.string()),
	materials: Joi.array().items(Joi.string()),
	introduction: Joi.string(),
	image: Joi.string().trim(),
	certificate: Joi.boolean(),
	duration: Joi.string(),
	start_date: Joi.date(),
	publish_date: Joi.date().default(() => new Date()),
	Instructor: Joi.string(),
	enrolledStudents: Joi.array().items(Joi.object()),
	exams: Joi.array().items(Joi.string()),
});

module.exports = { newCourseValidation, updateCourseValidation };
