const express =require('express')
const router = express.Router()
const {createJob, getJob , updateJob, deleteJob , getAllJobs} = require('../controllers/job.control')
const {upload} = require('../middlewares/uploadMiddleware')
const jobValidation = require('../validation/job.validation')
// const { validationMiddleware } = require('../middlewares/validationMiddleware')
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');


router.route('/')
        // .post(validationMiddleware(jobValidation) , upload.single('image') , createJob())
        .get(getJob)
        .get(getAllJobs)

router.route('/:id' , validateObjectId)
    //   .path(validationMiddleware(jobValidation) , upload.single('image') , updateJob)
      .delete(deleteJob)

module.exports = router;