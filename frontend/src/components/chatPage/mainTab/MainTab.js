import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSocket } from "../../../utils/socket";
import theme from "../../../utils/theme";

const socket = getSocket();

const MainTab = (props) => {
  const {username} = props;

  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    socket.emit("getJoinRooms", (username));
    socket.on("joinRoomList", ({rooms}) => {
      console.log('run');
      console.log('rooms', rooms);
      setRoomList(rooms);
    })
  }, [roomList]);

  const renderProfile = () => (
    <ProfileContainer>
      <Avatar/>
      <NameWrapper>{username}</NameWrapper>
    </ProfileContainer>
  )

  return (
    <MainTebContainer>
      {renderProfile()}    
      <StyledAccordion>
        <StyledAccordionSummary
          expandIcon={<ExpandMore/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Users</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <Typography>User</Typography>
        </StyledAccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary
          expandIcon={<ExpandMore/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Groups</Typography>
        </StyledAccordionSummary>
        {roomList.map((room) => (
          <StyledAccordionDetails>
            <Typography>{room}</Typography>
          </StyledAccordionDetails>
        ))}
      </StyledAccordion>
    </MainTebContainer>
  )
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

const NameWrapper = styled(Typography)`

`;

const StyledAccordion = styled(Accordion)`
  width: 100%;
  border-radius: 0px;
  box-shadow: 0px;
  border-bottom: 1px solid ${theme.color.gray0};
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  background-color: ${theme.color.gray0};
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  bordertop: 1px solid rgba(0, 0, 0, .125);
`;

export default MainTab;