const File = require("../models/file_model")
const cloudinary = require("cloudinary").v2
exports.localFileUpload = async(req,res)=>{
    try{
        const file = req.files.file 
        console.log("FILE is",file)

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`
        console.log("Path",path)
        file.mv(path, (err) =>{
            console.log(err)
        })
        

        res.json({
            success:true,
            messsage:"Local file uploaded"
        })
    }catch(err){
        console.log(err)
    }
}

function isFileSupported(type,supportedTypes){
    return supportedTypes.includes(type)
    
}
async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder}
    if(quality){
        options.quality = quality;
    }
   const data =  await cloudinary.uploader.upload(file.tempFilePath,options);

    return data
}
exports.imageUpload = async (req,res) =>{ //25:48
    try{
        const {name , tags , email } = req.body
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log(file);
        const supportedTypes = ["jpg","jpeg" ,"png"]
        const fileType = file.name.split('.')[1].toLowerCase()
        console.log(fileType)
        if(!isFileSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            })
        }
        const response = await uploadFileToCloudinary(file, "vk/file_upload");
        console.log(response);
        // //db main bhi entry save krni hai
        const fileData = await File.create({
            name,tags,email, imageUrl:response.secure_url
        })
        console.log(fileData)
        res.json({
          success: true,
          message: "Image Uploaded Successfully",
          imageFile: response.secure_url,
        });
    }
    catch(error){
            console.error(error);
            res.status(400).json({
                success:false,
                message:"Something went wrong"
            })
    }
}
exports.videoUpload = async (req,res)=>{
try{
        const { name, tags, email } = req.body;
        console.log(name, tags, email);
        const file = req.files.videoFile;
        const supportedTypes = ["mp4", "mov"];
                const fileType = file.name.split(".")[1].toLowerCase();
                console.log(fileType);
                if (!isFileSupported(fileType, supportedTypes)) {
                  return res.status(400).json({
                    success: false,
                    message: "File format not supported",
                  });
                }
                const response = await uploadFileToCloudinary(
                  file,
                  "vk/file_upload"
                );
                console.log(response);
                // //db main bhi entry save krni hai
                const fileData = await File.create({
                  name,
                  tags,
                  email,
                  imageUrl: response.secure_url,
                });
                console.log(fileData);
                res.json({
                  success: true,
                  message: "VideoUploaded Successfully",
                  imageFile: response.secure_url,
                });
        


}catch(e){
    res.status(400).json({
        success:false,
        message:"Something went wrong"
    })
}
}

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.imageFile;
    const supportedTypes = ["jpeg", "jpg","png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType);
    if (!isFileSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    const response = await uploadFileToCloudinary(file, "vk/file_upload",10);
    console.log(response);
    // //db main bhi entry save krni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    console.log(fileData);
    res.json({
      success: true,
      message: "FIle uploaded Successfully",
      imageFile: response.secure_url,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};