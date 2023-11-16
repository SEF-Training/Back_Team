const { getAllUsersCtrl, getOneUserCtrl, createByAdminCtrl, updateByAdminCtrl, updateUserProfileCtrl, deleteUserCtrl, getCurrentUserCtrl } = require("../controllers/userController")
const { authorizeAdmin, authenticate } = require("../middlewares/authenticateMiddleware")
const { upload } = require("../middlewares/uploadMiddleware")
const validateObjectId = require("../middlewares/validateObjectIdMiddleware")
const { validationMiddleware } = require("../middlewares/validationMiddleware")
const { createByAdminSchema, updateByAdminSchema, updateUserProfileSchema } = require("../validation/userValidation")
const router=require("express").Router()
router.get('/get-all',authorizeAdmin ,getAllUsersCtrl)
router.get('/get-one/:id',validateObjectId, authorizeAdmin ,getOneUserCtrl)
router.post('/create-by-admin',authorizeAdmin, validationMiddleware(createByAdminSchema),createByAdminCtrl)
router.patch('/update-by-admin/:id',validateObjectId,authorizeAdmin, validationMiddleware(updateByAdminSchema),updateByAdminCtrl)
router.patch('/update-profile/:id',validateObjectId,authenticate, validationMiddleware(updateUserProfileSchema),upload.single('image'),updateUserProfileCtrl)
router.delete('/delete-user/:id',validateObjectId,authorizeAdmin,deleteUserCtrl)
router.post('/current-user',authenticate,getCurrentUserCtrl)
module.exports=router