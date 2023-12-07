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

	upload_date: Joi.date(),
});

const updateCertificateValidation = Joi.object({
	certificate_file: Joi.string().trim(),
	acquired_date: Joi.date(),
	student: Joi.string(),
	course: Joi.string(),
	upload_date: Joi.date(),
});

module.exports = { newCertificateValidation, updateCertificateValidation };