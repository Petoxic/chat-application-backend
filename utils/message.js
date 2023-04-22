const moment = require("moment");

// messages = [ { username, text, room, time, isAnnounce }, ... ]
const messages = [];
// pinnedMessage = [ { username, text, room, time }, ... ]
const pinnedMessages = [];

function pushMessage(username, text, room) {
  const message = {
    username,
    text,
    room,
    time: moment().format("h:mm a"),
    isAnnounce: false,
  };

  messages.push(message);

  return message;
}

function pushAnnouncement(text, room) {
  const timestamp = moment().format("h:mm a");
  const message = {
    text: `${timestamp}: ${text}`,
    room,
    time: timestamp,
    isAnnounce: true,
  };

  messages.push(message);

  return message;
}

function pushPinnedMessage(username, text, room) {
  const roomIndex = pinnedMessages.findIndex((msg) => msg.room === room);
  if (roomIndex !== -1) {
    pinnedMessages.splice(roomIndex, 1);
  }
  const msg = {
    username,
    text,
    room,
    time: moment().format("h:mm a"),
  };
  pinnedMessages.push(msg);
  return msg;
}

function getPinnedMessage(room) {
  return pinnedMessages.find((msg) => msg.room === room);
}

module.exports = { pushAnnouncement, pushMessage, pushPinnedMessage, getPinnedMessage };
