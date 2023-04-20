import React, { useState } from "react";
import styled from "@emotion/styled";
import ChatHistory from "./chatHistory/ChatHistory";
import ChatRoom from "./chatRoom/ChatRoom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const ChatPage = () => {
  const [currentRoom, setCurrentRoom] = useState("test1");
  const location = useLocation();

  // const changeRoom = () => {
  //   if (currentRoom === "test1") {
  //     setCurrentRoom("test4");
  //   } else {
  //     setCurrentRoom("test1");
  //   }
  // };

  return (
    <ContentContainer>
      {/* <Button onClick={changeRoom}>Change Room!</Button> */}
      <ChatHistory />
      <ChatRoom username={location.state.username} currentRoom={currentRoom} />
    </ContentContainer>
  );
};

export default ChatPage;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
