const express = require("express");
const path = require("path");
const http = require("http");
// const socketio = require("socket.io");
const { Server } = require("socket.io");
const formatMessage = require("./utils/message");
const {
  userJoinChat,
  userJoinRoom,
  getCurrentUser,
  getRoomUsers,
  userLeave,
} = require("./utils/users");
const { clientJoin, getClients } = require("./utils/clients");

const app = express();
const server = http.createServer(app);
// const io = socketio(server);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.static(path.join(__dirname, "public")));

// app.use(express.static(path.join(__dirname, "frontend/src")));

io.on("connection", (socket) => {
  socket.on("landing", ({ username }) => {
    io.emit("clientJoin", {
      clients: getClients(),
    });
  });

  socket.on("joinChat", (username) => {
    userJoinChat(socket.id, username);
  });

  socket.on("joinRoom", ({ username, room }) => {
    const client = clientJoin(socket.id, username);
    const user = userJoinRoom(socket.id, username, room);

    socket.join(user.room);

    socket.emit("message", formatMessage("Bot", "Welcome to Thailand only!"));

    io.to(user.room).emit(
      "message",
      formatMessage("Bot", `${user.username} Ma laew ja`)
    );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    console.log(msg);
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("Bot", `${user.username} Pai la ja`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });

  socket.on("getUsers", (room) => {
    io.emit("sendUsers", { users: getRoomUsers(room) });
  });
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
