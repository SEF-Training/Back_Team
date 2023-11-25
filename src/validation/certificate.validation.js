const Joi = require('joi');

const newCertificateValidation = Joi.object({
	certificate_file: Joi.string(),
	// .required()
	// .messages({ 'any.required': 'Please select the certificate file' }),

	acquired_date: Joi.date()
		.required()
		.messages({ 'any.required': 'Please select the start date' }),

	course: Joi.string()
		.required()
		.messages({ 'any.required': 'Please select the course' }),

	student: Joi.string()
		.required()
		.messages({ 'any.required': 'Please select the Student' }),

	// publish_date: Joi.date().default(() => new Date()),
});

const updateCertificateValidation = Joi.object({
	certificate_file: Joi.string().trim(),

	acquired_date: Joi.date(),

	student: Joi.string(),

	course: Joi.string(),
	// publish_date: Joi.date(),
});

module.exports = { newCertificateValidation, updateCertificateValidation };