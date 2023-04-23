import React, { useState } from "react";
import styled from "@emotion/styled";
import ChatRoom from "./chatRoom/ChatRoom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import NavBar from "../navBar/NavBar";
import { joinRoom, leaveRoom } from "../../utils/socket";

const ChatPage = () => {
  const [currentRoom, setCurrentRoom] = useState();
  const location = useLocation();

  const changeRoom = (room) => {
    console.log('room', room, currentRoom);
    if(currentRoom) {
      leaveRoom(location.state.username, currentRoom);
    }
    joinRoom(location.state.username, room);
    setCurrentRoom(room);
  };

  console.log('currentRoom', currentRoom);

  return (
    <ContentContainer>
      <NavBar username={location.state.username} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} changeRoom={changeRoom}/>
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
