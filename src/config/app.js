const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const notFoundUrl=require("../routes/notFoundRoutes")
const path = require('path');
const { httpLogger } = require('../services/httpLoggerService');
const { errorHandler } = require('../middlewares/errorHandlerMiddleware');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())
app.use(httpLogger);
app.get('/',(req,res)=>{
    //test error
 throw new Error('error')
})
app.use("/seff-academy/v1.0", require("../routes"))
app.use('/seff-academy/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(notFoundUrl)
app.use(errorHandler)
module.exports = app;