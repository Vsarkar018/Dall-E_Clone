const mongoose = require("mongoose");

const connectDB = (uri) => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;