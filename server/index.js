const express = require("express");
require("express-async-errors");
require("dotenv").config();
const app = express();
const connectDB = require("./db/connect");
app.use(require("cors")());
app.use(express.json({ limit: "50mb" }));
const postRoutes = require("./routes/PostRoutes");
const dallERoutes = require("./routes/DallERoutes");

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dallE", dallERoutes);

app.get("/", async (req, res) => {
  res.send("API is running...");
});

const port = 5000 || process.env.PORT;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on the port ${port}`)
    );
  } catch (error) {
    console.log(error);
    console.log("Server not able to connect");
  }
};

startServer();
