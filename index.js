const express = require("express")
const fileUpload = require("express-fileupload")
const app = express()
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
require("dotenv").config()
const PORT = process.env.PORT || 3000

const db = require("./config/database")
db.connect()

const cloudinary = require("./config/cloudinary")
cloudinary.cloudinary()

const Upload= require("./routes/file_routes")
app.use("/api/v1/upload",Upload)

app.listen(PORT, () =>{
    console.log("APP is running")
})