import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Input, Button } from "@mui/material";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

import theme from "../../utils/theme";
import MessageBubbleLeft from "./MessageBubbleLeft";
import MessageBubbleRight from "./MessageBubbleRight";
import JoiningMessage from "./JoiningMessage";

const moment = require("moment");
const socket = io("http://localhost:3001");

const ChatRoom = () => {
  // socket.on("message", (message) => console.log(message));

  const location = useLocation();

  useEffect(() => {});

  return (
    <ContentContainer>
      <NameWrapper>Worachot</NameWrapper>
      <ChatContent>
        <JoiningMessage
          message={`${moment().format("h:mm a")}: ${
            location.state.username
          } join the chat!`}
        />
        <MessageBubbleLeft name="Worachot" message="asdf" time="22.22am" />
        <MessageBubbleRight message="asdf" time="22.23am" />
      </ChatContent>
      <MessageContainer>
        <Input
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
        <Button sx={{ backgroundColor: theme.color.white, margin: "10px" }}>
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
