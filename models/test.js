const cloudinary = require("cloudinary").v2;

// Provide your Cloudinary configuration here
cloudinary.config({
  cloud_name: "dqjek5iro",
  api_key: "549181616171492",
  api_secret: "kM0wJfyZU7_CxmQs0SuCw9kbpDA",
});

// Test Cloudinary configuration
cloudinary.uploader.upload(
  "https://res.cloudinary.com/demo/image/upload/c_fill,g_west,h_210,w_185/paint.jpg",
  (error, result) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Upload Result:", result);
    }
  }
);
