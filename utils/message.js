const moment = require("moment");

const messages = [];

function pushMessage(username, text, room) {
  const message = { username, text, room };

  messages.push(message);

  return message;
}

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}

module.exports = { formatMessage, pushMessage };
