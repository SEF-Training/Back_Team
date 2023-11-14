const express =require('express')
const router = express.Router()
const {createJob, getJob , updateJob, deleteJob , getAllJobs} = require('../controllers/job.control')
const {upload} = require('../middlewares/uploadMiddleware')
const jobValidation = require('../validation/job.validation')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const { authorizeAdmin } = require('../middlewares/authenticateMiddleware')
// const authenticateMiddleware = require('../middlewares/authenticateMiddleware')


router.route('/')
        // .post(validationMiddleware(jobValidation) , upload.single('image') , createJob())
        .get(getAllJobs)
        .post(authorizeAdmin, validationMiddleware(jobValidation), upload.single('image'), createJob)

router.route('/:id' , validateObjectId)
    //   .path(validationMiddleware(jobValidation) , upload.single('image') , updateJob)
      .delete(authorizeAdmin, deleteJob)
      .get(getJob)
      .patch(authorizeAdmin, validationMiddleware(jobValidation), upload.single('image'), updateJob)

module.exports = router;