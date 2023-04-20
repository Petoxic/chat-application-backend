const express = require("express");
const path = require("path");
const http = require("http");
// const socketio = require("socket.io");
const { Server } = require("socket.io");
const { pushMessage, pushAnnouncement } = require("./utils/message");
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

  // join the chat page
  socket.on("joinChat", (username) => {
    userJoinChat(socket.id, username);
  });

  // join the chat room
  socket.on("joinRoom", ({ username, room }) => {
    const client = clientJoin(socket.id, username);
    const user = userJoinRoom(socket.id, username, room);

    socket.join(user.currentRoom);
    // const message = pushMessage(
    //   "Bot",
    //   "Welcome to Thailand only!",
    //   user.currentRoom
    // );

    const message = pushAnnouncement(
      `${user.username} Ma laew ja`,
      user.currentRoom
    );

    // TODO: add this description
    // socket.emit("message", message);

    // TODO: add this description
    io.to(user.currentRoom).emit("message", message);

    // TODO: add this description
    io.to(user.currentRoom).emit("roomUsers", {
      room: user.currentRoom,
      users: getRoomUsers(user.currentRoom),
    });
  });

  // TODO: add this description
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    const message = pushMessage(user.username, msg, user.currentRoom);
    io.to(user.currentRoom).emit("message", message);
  });

  // TODO: add this description
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.currentRoom).emit(
        "message",
        pushAnnouncement(`${user.username} Pai la ja`, user.currentRoom)
      );

      io.to(user.currentRoom).emit("roomUsers", {
        room: user.currentRoom,
        users: getRoomUsers(user.currentRoom),
      });
    }
  });

  // get users in that room
  // socket.on("getUsers", (room) => {
  //   io.emit("sendUsers", { users: getRoomUsers(room) });
  // });

  // check if user is in that room or not
  socket.on("checkRoom", (checkRoom) => {
    const user = getCurrentUser(socket.id);
    if (user === undefined) {
      // return search result
      io.emit("checkRoomResult", { isJoin: false, username: user.username });
    } else {
      const room = user.roomList.find((room) => room === checkRoom);
      io.emit("checkRoomResult", { isJoin: true, username: user.username });
    }
  });
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
