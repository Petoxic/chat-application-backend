const express = require("express");
const path = require("path");
const http = require("http");
// const socketio = require("socket.io");
const { Server } = require("socket.io");
const {
  pushMessage,
  pushAnnouncement,
  pushPinnedMessage,
  getPinnedMessage,
} = require("./utils/message");
const {
  userJoinChat,
  userJoinRoom,
  getCurrentUser,
  getRoomUsers,
  userLeaveRoom,
} = require("./utils/users");
const {
  createRoom,
  joinRoom,
  getRooms,
  getJoinRooms,
  getUnjoinRooms,
} = require("./utils/rooms");
const { clientJoin, getClients } = require("./utils/clients");
const { create } = require("domain");

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
    joinRoom(username, room);

    socket.join(user.currentRoom);

    const message = pushAnnouncement(
      `${user.username} Ma laew ja`,
      user.currentRoom
    );

    // send message to everyone in room
    io.to(user.currentRoom).emit("message", message);

    // resend list of users in room
    io.to(user.currentRoom).emit("roomUsers", {
      room: user.currentRoom,
      users: getRoomUsers(user.currentRoom),
    });

    io.to(user.currentRoom).emit(
      "sendPinnedMessage",
      getPinnedMessage(user.currentRoom)
    );
  });

  // send message into room
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    const message = pushMessage(user.username, msg, user.currentRoom);
    io.to(user.currentRoom).emit("message", message);
  });

  // leave room
  socket.on("leaveRoom", (room) => {
    const user = userLeaveRoom(socket.id, room);
    if (user) {
      io.to(room).emit(
        "message",
        pushAnnouncement(`${user.username} Pai la ja`, room)
      );

      io.to(room).emit("roomUsers", {
        room: user.currentRoom,
        users: getRoomUsers(room),
      });
    }
  });

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

  // pin a message
  socket.on("pinMessage", ({ room, message }) => {
    const user = getCurrentUser(socket.id);
    const msg = pushPinnedMessage(user.username, message, room);
    // send pinned message to all users in room
    io.to(room).emit("sendPinnedMessage", msg);
  });

  // create room
  socket.on("createRoom", ({ username, room }) => {
    const user = userJoinRoom(socket.id, username, room);
    createRoom(username, room);
    // io.emit("roomList", { rooms: getRooms() });
    io.emit("roomCreated");
  });

  // get unjoin room list
  socket.on("getUnjoinRooms", (username) => {
    io.emit("unjoinRoomList", { rooms: getUnjoinRooms(username) });
  });

  // get join room list
  socket.on("getJoinRooms", (username) => {
    io.emit("joinRoomList", { rooms: getJoinRooms(username) });
  });
});

const PORT = 3001 || process.env.PORT;

server.listen(process.env.PORT || 3001, () => {
  console.log(`server is running on port: ${PORT}`);
});
