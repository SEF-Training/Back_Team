const router=require("express").Router()
router.use("/auth", require("./authRoutes"))
router.use("/users", require("./userRoutes"))
router.use('/courses', require('./course.route'));
router.use('/certificates', require('./certificate.route'));
router.use('/articles', require('./article.route'));

module.exports=router