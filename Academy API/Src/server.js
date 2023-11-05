const express = require("express");
const mongoose=require('mongoose')
const app = express();
const port = process.env.port || 5000;
const cors=require("cors")
const cookieparser = require('cookie-parser')
require('dotenv').config()
const url = process.env.DB_URL
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{console.log("**********Connected**********");}).catch((error)=>{console.log(error.message)})
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieparser())
app.listen(port, () => console.log("**********Here-We-Go**********"+port));

