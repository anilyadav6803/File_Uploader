



const express = require("express");
const router = express.Router();

const { localfiles , imageUploader  } = require("../controllers/fileUpload"); // Ensure this path is correct


router.post("/localFileUpload", localfiles); // Ensure `localfiles` matches the export in the controller
router.post("/imageUploader" , imageUploader)

module.exports = router;
