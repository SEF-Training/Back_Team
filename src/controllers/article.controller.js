const Article = require('../models/article.model');
const asyncHandler = require('express-async-handler');
const { infoLogger } = require('../services/infoLoggerService');
const { paginate } = require('../utils/pagination');

const articleController = {
	getAllArticles: asyncHandler(async (req, res) => {
		const userRole = req.user?.role;

		let queryRole = {};
		if (userRole == 'Admin') {
			queryRole = {};
		} else {
			queryRole = { isPublished: true };
		}

		const { error, data, pagination } = await paginate(Article, req, queryRole);
		if (error) {
			return res.status(404).json({ success: false, error });
		}

		res.status(200).json({ success: true, data, pagination });
	}),

	getArticle: asyncHandler(async (req, res) => {
		const userRole = req.user?.role;

		let queryRole = {};
		if (userRole == 'Admin') {
			queryRole = {};
		} else {
			queryRole = { isPublished: true };
		}

		const article = await Article.findOne({ _id: req.params.id, ...queryRole });
		if (!article) {
			return res.status(404).json({ success: false, error: 'Article not found' });
		}

		res.status(200).json({ success: true, data: article });
	}),

	createArticle: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.cover = `/articles/${req.file.filename}`;
		}

		let status = false;
		if (req.body?.publish_date) {
			status = new Date(req.body?.publish_date) <= Date.now();
		} else {
			status = req.body?.isPublished;
		}

		const newArticle = new Article({
			...req.body,
			isPublished: status,
		});

		if (!newArticle) {
			return res.status(400).json({
				success: false,
				message: 'Something went wrong while create article',
			});
		}

		const savedArticle = await newArticle.save();
		res.status(201).json({
			success: true,
			data: savedArticle,
			message: 'Article was created successfully',
		});
		infoLogger.info(
			`article ${savedArticle?.title} | ${savedArticle?._id} | Article was created successfully by user ${req.user?._id}`
		);
	}),

	updateArticle: asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.cover = `/articles/${req.file.filename}`;
		}
		const { id } = req.params;

		// const article = await Article.findById(_id);

		// if (!article) {
		// 	return res.status(404).json({ success: false, error: 'Article not found' });
		// }

		// if (userId !== article.creatorId && !req.user.isAdmin) {
		// 	return res.status(403).json({ error: 'Permission denied' });
		// }

		let status = false;
		if (req.body?.publish_date) {
			status = new Date(req.body?.publish_date) <= Date.now();
		} else {
			status = req.body?.isPublished;
		}
		const updatedArticle = await Article.findByIdAndUpdate(
			{_id: id},
			{ ...req.body, isPublished: status },
			{ new: true }
		);

		if (!updatedArticle) {
			return res.status(404).json({ success: false, error: 'Article not found' });
		}

		res.status(201).send({
			success: true,
			data: updatedArticle,
			message: 'Article was updated successfully',
		});
		infoLogger.info(
			`article ${updatedArticle?.title} | ${updatedArticle?._id} | Article was updated successfully by user ${req.user?._id}`
		);
	}),

	deleteArticle: asyncHandler(async (req, res) => {
		const { id } = req.params;

		const deletedArticle = await Article.findByIdAndDelete({ _id: id });

		if (!deletedArticle) {
			return res.status(404).json({ success: false, error: 'Article not found' });
		}

		res.status(201).json({
			success: true,
			message: 'Article was deleted successfully',
		});
		infoLogger.info(
			`article ${deletedArticle?.title} | ${deletedArticle?._id} | Article was deleted successfully by user ${req.user?._id}`
		);
	}),
};

module.exports = articleController;

// ------------------------------ auto Update Article Status------------------------
exports.autoUpdateArticleStatus = async (req, res) => {
	try {
		const currentDate = new Date();
		const draftArticles = await Article.find({ isPublished: false });

		if (!draftArticles) return null;

		for (const article in draftArticles) {
			if (article.publish_date >= currentDate) {
				await Article.updateOne(
					{ _id: article?._id },
					{ $set: { isPublished: true } }
				);
				infoLogger.info(
					`article ${article?.title} | ${article?._id} | isPublished auto updated from  false 'draft' to true 'published'`
				);
			}
		}
	} catch (error) {
		error.message = 'something went wrong while auto update article isPublished';
		if (process.env.NODE_ENV == 'development') {
			console.log(error);
		}
		errorLogger.error(error);
	}
};
