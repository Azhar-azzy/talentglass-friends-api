const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect("mongodb://localhost:27017/talentglass", () => {
    console.log("MongoDB connected");
  });
};

module.exports = connectToMongo;
