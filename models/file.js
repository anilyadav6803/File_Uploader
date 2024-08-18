const mongoose = require("mongoose");
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//post middleware
fileSchema.post("save" , async function(doc){
  try {
     console.log("Doc" , doc)
  } catch (error) {
    
  }
})

const file = mongoose.model("file",fileSchema)
module.exports = file;