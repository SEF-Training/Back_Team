const express = require('express');
const router = express.Router();
const { upload } = require('../middlewares/uploadMiddleware');
const { validationMiddleware } = require('../middlewares/validationMiddleware');
const { authorizeAdmin, authenticate } = require('../middlewares/authenticateMiddleware');
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const articleController = require('../controllers/article.controller');
const { newArticleValidation, updateArticleValidation } = require('../validation/article.validation');



// -------------------------------------- all articles routes ----------------------
router.post(
	'/',
	authorizeAdmin,
	upload.single('cover'),
	validationMiddleware(newArticleValidation),
	articleController.createArticle
);
router.get('/', authenticate, articleController.getAllArticles);


// single articles routes operations --
router.get('/:id', authenticate, validateObjectId, articleController.getArticle);

router
	.route('/:id')
	.all(authorizeAdmin, validateObjectId)
	.patch(
		upload.single('cover'),
		validationMiddleware(updateArticleValidation),
		articleController.updateArticle
	)
	.delete(articleController.deleteArticle);

module.exports = router;
