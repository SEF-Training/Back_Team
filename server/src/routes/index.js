const router=require("express").Router()
router.use("/auth", require("./authRoutes"))
router.use("/users", require("./userRoutes"))
router.use('/courses', require('./course.route'));

module.exports=router