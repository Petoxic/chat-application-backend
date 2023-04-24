import React, { useState } from "react";
import styled from "@emotion/styled";
import ChatRoom from "./chatRoom/ChatRoom";
import DirectMessageRoom from "./chatRoom/DirectMessageRoom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import NavBar from "../navBar/NavBar";
import { joinRoom, leaveRoom } from "../../utils/socket";

const ChatPage = () => {
  const [currentTarget, setCurrentTarget] = useState(null);
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const location = useLocation();

  const changeRoom = (target, isDirect) => {
    if (isDirect) {
      setIsDirectMessage(true);
    } else {
      setIsDirectMessage(false);
      joinRoom(location.state.username, target);
    }
    setCurrentTarget(target);
  };

  return (
    <ContentContainer>
      <NavBar username={location.state.username} changeRoom={changeRoom} />
      {isDirectMessage ? (
        <DirectMessageRoom
          username={location.state.username}
          talker={currentTarget}
        />
      ) : (
        <ChatRoom
          username={location.state.username}
          currentRoom={currentTarget}
        />
      )}
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
