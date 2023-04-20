const moment = require("moment");

// messages = [ { username, text, room, time, isAnnounce }, ... ]
const messages = [];

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

module.exports = { pushAnnouncement, pushMessage };
