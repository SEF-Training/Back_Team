const router=require("express").Router()
router.use("/auth", require("./authRoutes"))
router.use("/users", require("./userRoutes"))
router.use('/courses', require('./course.route'));
router.use('/jobs' , require('./job.route.js'))
module.exports=router