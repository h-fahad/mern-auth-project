//create a new chat
//findUserChats
//findChats

const ChatSchema = require("../models/ChatModel");

const createChat = async (res, req) => {
  const { user1, user2 } = req.body;
  try {
    const chat = await ChatSchema.findOne({
      members: { $all: [user1, user2] },
    });
    if (chat) {
      res.status(200).json(chat);
    }
    const newChat = new ChatSchema({ members: [user1, user2] });
    const response = await newChat.save();
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

const findUserChats = async (res, req) => {
  const { userId } = req.params;
  try {
    const chats = await ChatSchema.find({ members: { $in: [userId] } });
    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const findChats = async (res) => {
  const { user1, user2 } = res.params;
  try {
    const chat = await ChatSchema.findOne({
      members: { $all: [user1, user2] },
    });
    if (chat) {
      res.status(200).json(chat);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

module.exports = { createChat, findUserChats, findChats };