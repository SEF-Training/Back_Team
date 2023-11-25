const Joi = require('joi');

const newApplicationValidation = Joi.object({
	name: Joi.string().required().messages({ 'any.required': 'Please enter your name' }),
	major: Joi.string(),
	
	exp: Joi.number().required().min(0).max(99).messages({
		'any.required': 'Please select Years Of Experience',
		'any.min': 'Course level must be number between 0 and 99',
		'any.mix': 'Course level must be number between 0 and 99',
	}),
	email: Joi.string().email().required().messages({
		'any.required': 'Please enter your email',
		'string.email': 'Email is not valid',
	}),
	mobileNumber: Joi.number(),
	cv: Joi.string(),
	job: Joi.string(),
});

const updateApplicationValidation = Joi.object({
	name: Joi.string(),
	major: Joi.string(),
	exp: Joi.number().min(0).max(99).integer().messages({
		'any.min': 'Course level must be number between 0 and 99',
		'any.mix': 'Course level must be number between 0 and 99',
	}),
	email: Joi.string().email().messages({
		'string.email': 'Email is not valid',
	}),
	mobileNumber: Joi.number(),
	job: Joi.string(),
	cv: Joi.string(),
});

module.exports = { newApplicationValidation, updateApplicationValidation };
