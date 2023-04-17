import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Input, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

import theme from "../../utils/theme";
import MessageBubbleLeft from "./MessageBubbleLeft";
import MessageBubbleRight from "./MessageBubbleRight";
import JoiningMessage from "./JoiningMessage";
import { getSocket, sendMessage } from "../../utils/socket";

const moment = require("moment");
const socket = getSocket();

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessagesToSend] = useState("");

  const location = useLocation();

  useEffect(() => {
    socket.on("message", (message) => {
      console.log('all Messages', message);
      setMessages([message]);
    })
  }, []);

  const onSend = () => {
    sendMessage(messageToSend);
    socket.on("message", (message) => {
      console.log('all Messages', message);
      setMessages([...messages, message]);
    })
    setMessagesToSend("");
  };

  return (
    <ContentContainer>
      <NameWrapper>Worachot</NameWrapper>
      <ChatContent>
        <JoiningMessage
          message={`${moment().format("h:mm a")}: ${
            location.state.username
          } join the chat!`}
        />
        {messages.map((msg) => (
          msg.username === location.state.username 
          ? <MessageBubbleRight message={msg.text} time={msg.time} />
          : <MessageBubbleLeft name={msg.username} message={msg.text} time={msg.time} />
        ))}
      </ChatContent>
      <MessageContainer>
        <Input
          value={messageToSend}
          onChange={(e) => setMessagesToSend(e.target.value)}
          placeholder="Enter a message"
          disableUnderline
          sx={{
            fontSize: "1rem",
            width: "85%",
            backgroundColor: theme.color.white,
            borderRadius: "10px",
            margin: "10px",
            padding: "5px 7px",
          }}
        />
        <Button 
          sx={{ backgroundColor: theme.color.white, margin: "10px" }}
          onClick={() => onSend()}
        >
          Send
        </Button>
      </MessageContainer>
    </ContentContainer>
  );
};

export default ChatRoom;

const ContentContainer = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NameWrapper = styled.p`
  width: 100%;
  height: 6%;
  background-color: ${theme.color.primary};
  font-size: 2.25rem;
  margin: 0;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 6%;
  background-color: ${theme.color.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChatContent = styled.div`
  width: 100%;
  height: 88%;
`;
