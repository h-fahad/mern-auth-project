const express = require("express");
const { findAllUsers, getUserById } = require("../controllers/userController");
const router = express.Router();

router.get("/", findAllUsers);
router.get("/:userId", getUserById);

module.exports = router;
