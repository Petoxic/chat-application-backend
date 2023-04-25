// rooms = [ { roomName, users }, ... ]
const rooms = [];

function createRoom(username, roomName) {
  const room = { roomName, users: [username] };
  rooms.push(room);
}

function joinRoom(username, roomName) {
  const room = rooms.find((room) => room.roomName === roomName);
  if (room !== undefined) {
    const user = room.users.find((u) => u === username);
    if (user === undefined) {
      room.users.push(username);
    }
  }
}

function getRooms() {
  return rooms;
}

function getUnjoinRooms(username) {
  const unjoinRooms = rooms.filter((room) => {
    return room.users.find((user) => user === username) === undefined;
  });
  return unjoinRooms;
}

function getJoinRooms(username) {
  const joinRooms = rooms.filter((room) => {
    return room.users.find((user) => user === username) !== undefined;
  });
  return joinRooms;
}

function leaveRoom(username, room) {
  const leavingRoom = rooms.find((r) => r.roomName === room);
  console.log(leavingRoom);
  if (leavingRoom !== undefined) {
    const userIdx = leavingRoom.users.findIndex((u) => u === username);
    if (userIdx !== -1) {
      leavingRoom.users.splice(userIdx, 1);
    }
  }
  console.log("result", leavingRoom);
  return leavingRoom;
}

module.exports = {
  createRoom,
  joinRoom,
  getRooms,
  getUnjoinRooms,
  getJoinRooms,
  leaveRoom,
};
