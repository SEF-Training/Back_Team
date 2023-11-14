const router=require("express").Router()
router.use("/auth", require("./authRoutes"))
router.use("/users", require("./userRoutes"))
router.use('/courses', require('./course.route'));
router.use('/jobs' , require('./job.route.js'))
router.use('/certificates', require('./certificate.route'));
module.exports=router