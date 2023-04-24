import { Chat, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSocket, joinRoom, leaveRoom } from "../../../utils/socket";
import theme from "../../../utils/theme";

const socket = getSocket();

const MainTab = (props) => {
  const { username, changeRoom } = props;

  const [roomList, setRoomList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("getJoinRooms", username);
    socket.emit("getAllUsers");
  }, []);

  socket.on("roomCreated", () => {
    socket.emit("getJoinRooms", username);
  });

  socket.on("joinRoomList", ({ name, rooms }) => {
    if (name === username) {
      setRoomList(rooms);
    }
  });

  socket.on("sendAllUsers", (users) => {
    setUsers(users);
  });

  const onJoinRoom = (room) => {
    changeRoom(room, false);
  };

  const onJoinDirectMessage = (talker) => {
    changeRoom(talker, true);
  };

  const renderProfile = () => (
    <ProfileContainer>
      <Avatar />
      <NameWrapper>{username}</NameWrapper>
    </ProfileContainer>
  );

  return (
    <MainTebContainer>
      {renderProfile()}
      <StyledAccordion>
        <StyledAccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Users</Typography>
        </StyledAccordionSummary>
        {users.map((user, idx) =>
          user.username !== username ? (
            <StyledAccordionDetails key={idx}>
              <Typography>{user.username}</Typography>
              <Chat
                sx={{ color: `${theme.color.gray2}` }}
                onClick={() => onJoinDirectMessage(user.username)}
              />
            </StyledAccordionDetails>
          ) : null
        )}
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Groups</Typography>
        </StyledAccordionSummary>
        {roomList.map((room, idx) => (
          <StyledAccordionDetails key={idx}>
            <Typography>{room.roomName}</Typography>
            <Chat
              sx={{ color: `${theme.color.gray2}` }}
              onClick={() => onJoinRoom(room.roomName)}
            />
          </StyledAccordionDetails>
        ))}
      </StyledAccordion>
    </MainTebContainer>
  );
};

const MainTebContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 5%;
  height: 60px;
  align-items: center;
`;

const NameWrapper = styled(Typography)``;

const StyledAccordion = styled(Accordion)`
  width: 100%;
  border-radius: 0px;
  box-shadow: 0px;
  border-bottom: 1px solid ${theme.color.gray0};
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  background-color: ${theme.color.gray0};
  border-radius: 0px;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  justify-content: space-between;
  border-radius: 0px;
`;

export default MainTab;
