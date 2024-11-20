// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chatRoute");
const messageRouter = require("./routes/messageRoute");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// Default route
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//Socket connection
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

//Auth Route
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
