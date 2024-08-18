const { response } = require("express");
const File = require("../models/file");
const { options } = require("../routes/fileUpload");

// Import and configure Cloudinary
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dy8hix7wi',  // Corrected key
  api_key: '488871223926726',  // Corrected key
  api_secret: 'ql9cnsqXP3BTjueDDQzj6bckJjE',  // Corrected key
});

// Local file upload handler
exports.localfiles = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("File received: ", file);

    let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(path, (err) => {
      if (err) {
        console.log("Error moving file:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to upload file locally",
          error: err.message,
        });
      }

      res.json({
        success: true,
        message: "Local file uploaded successfully",
      });
    });
  } catch (error) {
    console.log("Error during file upload:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during file upload",
      error: error.message,
    });
  }
};

async function uploadCloudnariy(file, folder) {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: folder,
  });
  console.log("Temp file path:", file.tempFilePath);
  return result;
}

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

exports.imageUploader = async (req, res) => {
  try {
    console.log(req.files); // Log req.files to see what is being passed
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files?.imageFiles; // Use optional chaining to prevent accessing undefined
    
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log(file);

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    const uploadResponse = await uploadCloudnariy(file, "fileUploader");

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: uploadResponse.secure_url,
    });

    res.json({
      success: true,
      message: "Image uploaded successfully",
      fileData,
    });
  } catch (error) {
    console.log("Error during image upload:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during image upload",
      error: error.message,
    });
  }
};