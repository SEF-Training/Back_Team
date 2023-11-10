const { loginCtrl, logoutCtrl, refreshAccessTokenCtrl, registerCtrl } = require("../controllers/authController");
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const { loginSchema, registerSchema } = require("../validation/authValidation");

const router = require("express").Router()
router.post("/register",validationMiddleware(registerSchema) ,registerCtrl);
router.post("/login", validationMiddleware(loginSchema), loginCtrl);
router.post("/logout", logoutCtrl);
router.post("/refresh-access-token", refreshAccessTokenCtrl);
module.exports = router
