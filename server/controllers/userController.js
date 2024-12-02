// create a controller for fetching all users
const User = require("../models/User");

// Fetch all users
const findAllUsers = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next);
  // handle errors
  res.status(500).json({ error: error.message });
  next(error);
  return;
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch(next);
};

module.exports = { findAllUsers, getUserById };
