const { loginCtrl, logoutCtrl, refreshAccessTokenCtrl, registerCtrl } = require("../controllers/auth.controller");
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const { loginSchema, registerSchema } = require("../validation/auth.validation");

const router = require("express").Router()
router.post("/register",validationMiddleware(registerSchema) ,registerCtrl);
router.post("/login", validationMiddleware(loginSchema), loginCtrl);
router.post("/logout", logoutCtrl);
router.post("/refresh-access-token", refreshAccessTokenCtrl);
module.exports = router
