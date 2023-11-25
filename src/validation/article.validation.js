const Joi = require('joi');
const { enum_ArticlesCategory } = require('../config/enums');

const newArticleValidation = Joi.object({
	title: Joi.string().required().min(3).max(100).messages({
		'any.required': 'Please enter a Article name',
		'any.min': 'Article name must be between 3 and 100 characters',
		'any.max': 'Article name must be between 3 and 100 characters',
	}),

	category: Joi.string()
		.valid(...enum_ArticlesCategory)
		.required()
		.trim()
		.messages({
			'any.required': 'Please provide a status for this Article',
			'any.only': `Must be one of the following values: ${enum_ArticlesCategory}`,
		}),

	content: Joi.string().required().messages({
		'any.required': 'Please provide a content for this Article',
	}),

	cover: Joi.string(),

	publish_date: Joi.date().default(Date.now()),

	// publish_by: Joi.string()
	// 	.required()
	// 	.messages({ 'any.required': 'Please select the Instructor' }),

	isPublished: Joi.boolean().required().messages({
		'any.required': 'Please specify if you want to publish or draft',
	}),
});

const updateArticleValidation = Joi.object({
	title: Joi.string().min(3).max(100).messages({
		'any.min': 'Article name must be between 3 and 100 characters',
		'any.max': 'Article name must be between 3 and 100 characters',
	}),

	category: Joi.string()
		.valid(...enum_ArticlesCategory)
		.trim()
		.messages({
			'any.required': 'Please provide a category for this Article',
			'any.only': `Must be one of the following values: ${enum_ArticlesCategory}`,
		}),

	content: Joi.string(),

	cover: Joi.string(),

	publish_date: Joi.date().default(Date.now()),

	// publish_by: Joi.string(),

	isPublished: Joi.boolean(),
});

module.exports = { newArticleValidation, updateArticleValidation };
