const express = require("express");
const { createChat, findUserChats, findChats } = require("../controllers/chatController");

const router = express.Router();

router.get("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:user1/:user2", findChats);

module.exports = router;