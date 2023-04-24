const moment = require("moment");

// messages = { [ sender, receiver, text, time ], ... }
const messages = [];

function pushDirectMessage(sender, receiver, text) {
  const message = {
    sender,
    receiver,
    text,
    time: moment().format("h:mm a"),
  };
  messages.push(message);
  return message;
}

module.exports = {
  pushDirectMessage,
};
