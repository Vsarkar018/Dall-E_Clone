const router = require("express").Router();
const { Configuration, OpenAIApi } = require("openai");
const Post = require("../models/Post");
require("dotenv").config();

const config = new Configuration({
  apiKey: process.env.OPENAI_APIKEY,
});
const openai = new OpenAIApi(config);

router
  .route("/")
  .get(function async(req, res) {
    res.send("DAll-E routes");
  })
  .post(async (req, res) => {
      const { prompt } = req.body;
      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });
      const image = aiResponse.data.data[0].b64_json;
      res.status(200).json({pic:image})
  });

module.exports = router;
