import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export const joinRoom = (username, room) => {
  socket.emit("joinRoom", { username, room });
}

export const sendMessage = (message) => {
  socket.emit("chatMessage", message);
}

export const getSocket = () => {
  return socket;
}
