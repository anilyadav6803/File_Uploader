const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp'
}));

// Connect to DB
const db = require("./config/database"); // Ensure this path is correct
db.connect();

// Connect to Cloudinary
const cloudinary = require("./config/cloudnariy"); // Ensure this path is correct
cloudinary.cloudinaryConnect();

// API Routes
const uploadRoutes = require("./routes/fileUpload"); // Ensure this path is correct
app.use('/api/v1/upload', uploadRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`App is running at port no ${PORT}`);
});

app.get('/' , (req,res) =>{
    res.send("ho gaya kam ?")
})
