const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    members: { type: Array, required: true },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
