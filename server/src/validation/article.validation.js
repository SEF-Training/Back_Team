const Joi = require('joi');
const { enum_ArticlesStatus } = require('../config/enums');


const newArticleValidation = Joi.object({
	title: Joi.string().required().min(3).max(50).messages({
		'any.required': 'Please enter a Article name',
		'any.min': 'Article name must be between 3 and 50 characters',
		'any.mix': 'Article name must be between 3 and 50 characters',
	}),

	category: Joi.string()
		.valid(...enum_ArticlesCategory)
		.required()
		.trim()
		// .default(enum_ArticlesCategory[0])
		.messages({
			'any.required': 'Please provide a status for this Article',
			'any.only': `Must be one of the following values: ${enum_ArticlesCategory}`,
		}),

	status: Joi.string()
		.valid(...enum_ArticlesStatus)
		.required()
		.trim()
		.default(enum_ArticlesStatus[0])
		.messages({
			'any.required': 'Please provide a status for this Article',
			'any.only': `Must be one of the following values: ${enum_ArticlesStatus}`,
		}),

	content: Joi.string().required().messages({
		'any.required': 'Please provide a content for this Article',
	}),

	cover: Joi.string(),

	publish_date: Joi.date().default(Date.now()),

	publishBy: Joi.string()
		.required()
		.messages({ 'any.required': 'Please select the Instructor' }),

	// isPublished: Joi.boolean(),
});


const updateArticleValidation = Joi.object({
	title: Joi.string().min(3).max(50).messages({
		'any.min': 'Article name must be between 3 and 50 characters',
		'any.mix': 'Article name must be between 3 and 50 characters',
	}),

	category: Joi.string()
		.valid(...enum_ArticlesCategory)
		.trim()
		// .default(enum_ArticlesCategory[0])
		.messages({
			'any.required': 'Please provide a status for this Article',
			'any.only': `Must be one of the following values: ${enum_ArticlesCategory}`,
		}),

	status: Joi.string()
		.valid(...enum_ArticlesStatus)
		.trim()
		.default(enum_ArticlesStatus[0])
		.messages({
			'any.only': `Must be one of the following values: ${enum_ArticlesStatus}`,
		}),

	content: Joi.string(),

	cover: Joi.string(),

	publish_date: Joi.date().default(Date.now()),

	publishBy: Joi.string(),

	// isPublished: Joi.boolean(),
});

module.exports = { newArticleValidation, updateArticleValidation };
