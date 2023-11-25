const router=require("express").Router()
router.use("/auth", require("./auth.route"))
router.use("/users", require("./user.route"))
router.use('/jobs' , require('./job.route.js'))
router.use('/courses', require('./course.route'));
router.use('/certificates', require('./certificate.route'));
router.use('/articles', require('./article.route'));
router.use('/exams', require('./exam.route'));
router.use("/applications", require("./application.route"));

module.exports=router
