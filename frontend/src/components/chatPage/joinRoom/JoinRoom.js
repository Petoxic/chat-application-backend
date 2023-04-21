import React, { useState } from  "react";
import styled from "styled-components";
import { GroupAdd } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  getSocket,
  sendMessage,
  isInRoom,
  joinRoom,
} from "../../../utils/socket";

const mockRoomList = [
  {name: "red room"},
  {name: "aren"}
]

const JoinRoom =  () => {

  const onJoinRoom = (username,room) => {
    joinRoom(username, room);
  };

  return(
    <ContentContainer>
      {mockRoomList.map((room) => (
        <JoinRoomWrapper>{room.name}<GroupAdd/></JoinRoomWrapper>
      ))}
      <Button onClick={onJoinRoom}>Join</Button>
    </ContentContainer>
  )
}

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const JoinRoomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
`;

export default JoinRoom;