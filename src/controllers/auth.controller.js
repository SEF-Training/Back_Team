const { User } = require("../models/user.model");
const asyncHandler = require('express-async-handler');
const { genUserId } = require("../utils/userIdGenerator");
const jwt = require('jsonwebtoken')
module.exports = {
    registerCtrl: asyncHandler(async (req, res) => {
        const uId = await genUserId()
        const newUser = new User({ ...req.body, userId: uId });
        await newUser.save();
        res.status(201).json({ success: true, message: "Account successfully created. Please login." });
    }),
    loginCtrl: asyncHandler(async (req, res) => {
        const { userId, password } = req.body;
        const userExist = await User.findOne({ userId });
        if (!userExist) return res.status(404).json({ success: false, error: "User not found." });
        if (userExist.accountStatus === "Inactive") return res.status(403).json({ success: false, message: "User Account is inActive" })
        const matchPassword = await userExist.comparePassword(password);
        if (!matchPassword) return res.status(400).json({ success: false, error: "Incorrect password. Please check your password and try again." });
        const { accessToken, refreshToken } = userExist.generateTokens();
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.status(200).json({ success: true, data: userExist });
    }),
    logoutCtrl: asyncHandler(async (req, res) => {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.send({ success: true });
    }),
    refreshAccessTokenCtrl: asyncHandler(async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ success: false, error: 'No token provided' });
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if (decoded.exp < Date.now() / 1000) return res.status(401).json({ success: false, error: 'your session is expired please login again' });
        const user = await User.findOne({ _id: decoded._id });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });
        const { accessToken } = await user.generateTokens(user);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.status(200).json({ success: true });
    })
}