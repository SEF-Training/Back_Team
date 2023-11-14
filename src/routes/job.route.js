const express =require('express')
const router = express.Router()
const {createJob, getJob , updateJob, deleteJob , getAllJobs} = require('../controllers/job.control')
const {upload} = require('../middlewares/uploadMiddleware')
const {createJobValidation} = require('../validation/job.validation')
const {updateJobValidation} = require('../validation/job.validation')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const validateObjectId = require('../middlewares/validateObjectIdMiddleware');
const {authenticate} =require('../middlewares/authenticateMiddleware')

router.post('/create-job',authenticate,upload.single('companyLogo') ,validationMiddleware(createJobValidation)  , createJob)
router.get('/get-job/:id',validateObjectId,authenticate , getJob)
router.get('/get-all-jobs',authenticate , getAllJobs)
router.patch('/update-job/:id' , validateObjectId,authenticate, validationMiddleware(updateJobValidation) , upload.single('companyLogo') , updateJob)
router.delete('/delete-job/:id' , validateObjectId ,authenticate, deleteJob)

module.exports = router;