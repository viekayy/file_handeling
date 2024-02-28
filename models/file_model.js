const mongoose = require("mongoose")
const nodemailer = require("nodemailer");
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
    ,imageUrl:{
        type:String,
    },
    tags:{
        type:String,
        
    },
    email:{
        type:String
    }
})
//post middleware

fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc);
        //transporeter
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          auth: {
            user: "viekayy.1234@gmail.com",
            pass: "jcrv hhon yfsk clha",
          },
        });
        //send mail
        let info = await transporter.sendMail({
          from: "VK",
          to: doc.email,
          subject: "NEW FILE UPLOADED",
          html: `<h2>HELLO JI</h2><p>File uploaded  View here: <a href=${doc.imageUrl}>${doc.imageUrl}</a> </p>`,
        });
        console.log(info)

    }catch(e){
        console.error(e)

    }
})


const File = mongoose.model("File",fileSchema)
module.exports = File
