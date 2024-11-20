const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: { type: Array, required: true },
    senderId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
