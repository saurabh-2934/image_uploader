const express = require("express");
const models = require("./models");
const upload = require("./middleware/upload");

// const multer = require("multer");

const app = express();

app.use(express.json());

//setup file multer to store the files in /upload folder
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     const suffix = Date.now();
//     cb(null, suffix + "-" + file.originalname);
//   },
// });

//

//configuring multer to store files in memory as buffer
// const storage = multer.memoryStorage();

// const upload = require("./middleware/upload");

app.post("/", upload.single("imageUrl"), async (req, res) => {
  try {
    const { name, email } = req.body;

    // Cloudinary gives URL automatically
    const imageUrl = req.file ? req.file.path : null;

    await models.User.create({
      name,
      email,
      image_url: imageUrl,
    });

    res.status(201).json({
      message: "User created",
      imageUrl,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8000, () => {
  console.log("server is listning");
});
