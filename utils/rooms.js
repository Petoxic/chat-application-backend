const rooms = [];

function createRoom(username, roomName) {
  const room = { roomName, users: [username] };
  rooms.push(room);
}

function joinRoom(username, roomName) {
  const room = rooms.find((room) => room.roomName === roomName);
  if (room !== undefined) {
    room.users.push(username);
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
module.exports = {
  createRoom,
  joinRoom,
  getRooms,
  getUnjoinRooms,
  getJoinRooms,
};
