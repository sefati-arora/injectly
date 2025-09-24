require("dotenv").config()

const express = require("express");
const fileUpload= require("express-fileupload");
const path = require("path")
const ConnectDB=require('./config/connectDB')
const app = express();
const PORT = 3008;
const Router=require('./router/userRouter');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
ConnectDB.connectDB();
app.use('/api',Router);
app.get("/", (req, res) => {
  res.send("SERVER CREATED");
});

app.listen(PORT, () => {
  console.log(`SERVER WILL BE RUNNING AT http://localhost:${PORT}/`);
});