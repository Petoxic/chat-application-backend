// users = [ { id, username, roomList: [ room1, room2, ... ], currentRoom: "room1" }, ... ]
const users = [];

// Join user to room
function userJoinRoom(id, username, selectedRoom) {
  // const user = { id, username, room };

  console.log(id, username);

  const user = users.find(
    (user) => user.id === id && user.username === username
  );

  if (user !== undefined) {
    const room = user.roomList.find((roomName) => roomName === selectedRoom);
    if (room === undefined) {
      user.roomList = [...user.roomList, selectedRoom];
    }
    user.currentRoom = selectedRoom;
  }

  // users.push(user);
  // console.log(users);
  console.log(user);
  return user;
}

// Join user to chat
// ? Is it possible not to have duplicate name in server???
function userJoinChat(id, username) {
  if (users.find((user) => user.id === id) === undefined) {
    const user = {
      id,
      username,
      roomList: [],
      currentRoom: "",
    };
    users.push(user);
    // console.log("users are -> ", users);
  } else {
    console.log("duplicate user");
  }
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(
    (user) => user.roomList.find((r) => r === room) !== undefined
  );
}

module.exports = {
  getCurrentUser,
  userLeave,
  getRoomUsers,
  userJoinChat,
  userJoinRoom,
};
