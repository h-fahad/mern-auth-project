const MessageSchema = require("../models/MessageModel");

const createMessage = (req, res) => {
  const { chatId, senderId, text } = req.body;
  const newMessage = new MessageSchema({ chatId, senderId, text });
  try {
    newMessage.save().then((message) => res.status(200).json(message));
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getMessages = (req, res) => {
  const { chatId } = req.params;
  try {
    MessageSchema.find({ chatId })
      .sort({ createdAt: -1 })
      .then((messages) => res.status(200).json(messages));
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { createMessage, getMessages };
