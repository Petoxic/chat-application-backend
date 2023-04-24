// users = [ { id, username, roomList: [ room1, room2, ... ], currentRoom: "room1" }, ... ]
const users = [];

// Join user to room
function userJoinRoom(id, username, selectedRoom) {
  // const user = { id, username, room };
  let isFirstTime;

  const user = users.find(
    (user) => user.id === id && user.username === username
  );

  if (user !== undefined) {
    const room = user.roomList.find((roomName) => roomName === selectedRoom);
    if (room === undefined) {
      user.roomList = [...user.roomList, selectedRoom];
      isFirstTime = true;
    } else {
      isFirstTime = false;
    }
    user.currentRoom = selectedRoom;
  }

  return { user, isFirstTime };
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

// User leaves room
function userLeaveRoom(id, room) {
  const user = users.find((user) => user.id === id);

  if (user !== undefined) {
    const roomIndex = user.roomList.findIndex((r) => r === room);
    if (roomIndex !== -1) {
      user.roomList.splice(roomIndex, 1);
      user.currentRoom = "";
      console.log(user);
      return user;
    }
  }
  console.log(user);
  return user;
}

// User leaves chat
function userLeaveChat(id) {
  const userIdx = users.findIndex((user) => user.id === id);
  if (userIdx !== -1) {
    users.splice(userIdx, 1);
  }
  return users;
}

// Get room users
function getRoomUsers(room) {
  return users.filter(
    (user) => user.roomList.find((r) => r === room) !== undefined
  );
}

function getAllUsers() {
  return users;
}

module.exports = {
  getCurrentUser,
  userLeaveRoom,
  getRoomUsers,
  userJoinChat,
  userJoinRoom,
  getAllUsers,
  userLeaveChat,
};
