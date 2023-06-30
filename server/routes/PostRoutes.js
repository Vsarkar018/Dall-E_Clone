const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const Post = require("../models/Post");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_SECRETKEY,
});

router.route("/")
  .get(async (req, res) => {
    const posts = await Post.find({});
    res.status(200).json({ data: posts });
  })
  .post(async (req, res) => {
    const { name, prompt, pic } = req.body;
    const photoUrl = await cloudinary.uploader.upload(pic);
    const newPost = await Post.create({ name, prompt, pic: photoUrl.url });
    res.status(200).json({ data: newPost });
  });

module.exports = router;
