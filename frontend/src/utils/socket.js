import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");
// const socket = io.connect("https://chat-socket-network.herokuapp.com/");

export const joinChat = (username) => {
  socket.emit("joinChat", username);
};

export const joinRoom = (username, room) => {
  socket.emit("joinRoom", { username, room });
};

export const createRoom = (username, room) => {
  socket.emit("createRoom", { username, room });
};

export const sendMessage = (message) => {
  socket.emit("chatMessage", message);
};

export const getSocket = () => {
  return socket;
};

export const isInRoom = (room) => {
  socket.emit("checkRoom", room);
};

//getJoinRoomList
export const getJoinRoomList = (username) => {
  socket.emit("getJoinRooms", username);
};

export const leaveRoom = (room) => {
  socket.emit("leaveRoom", room);
};

export const pinMessage = (room, message) => {
  socket.emit("pinMessage", { room, message });
};
