const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const Friend = mongoose.model("friend", FriendSchema);
module.exports = Friend;
