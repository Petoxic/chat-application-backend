import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Input, Button, Modal } from "@mui/material";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

import theme from "../../utils/theme";
import MessageBubbleLeft from "./MessageBubbleLeft";
import MessageBubbleRight from "./MessageBubbleRight";
import JoiningMessage from "./JoiningMessage";

const moment = require("moment");
const socket = io("http://localhost:3001");

const ChatRoom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const location = useLocation();

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  // ! This might be edited. Is it ok enough when other users join the chat???
  socket.on("sendUsers", (usersList) => setUsersList(usersList.users));

  useEffect(() => {
    socket.emit("getUsers", location.state.room);
  }, []);

  return (
    <ContentContainer>
      <NameWrapper>
        <RoomTitle>{location.state.room}</RoomTitle>
        <Button
          onClick={openHandler}
          sx={{ backgroundColor: theme.color.white, margin: "10px" }}
        >
          Users List
        </Button>
        <Modal
          open={isOpen}
          onClose={closeHandler}
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <ModalContainer>
            <ModalTitleContainer id="modal-title">
              <ModalTitle>Users List</ModalTitle>
              <Button
                onClick={closeHandler}
                sx={{ backgroundColor: theme.color.white, margin: "10px" }}
              >
                Close
              </Button>
            </ModalTitleContainer>
            <UsersListContainer id="modal-desc">
              {usersList.map((user) => (
                <p>{user.username}</p>
              ))}
            </UsersListContainer>
          </ModalContainer>
        </Modal>
      </NameWrapper>
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

const NameWrapper = styled.div`
  width: 100%;
  height: 6%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.color.primary};
`;

const RoomTitle = styled.p`
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
  overflow-y: scroll;
`;

const ModalContainer = styled.div`
  width: 50%;
  height: 50%;
  transform: translate(50%, 50%);
  overflow-y: scroll;
  background-color: ${theme.color.white};
`;

const ModalTitleContainer = styled.div`
  height: 12%;
  display: flex;
  flex-display: row;
  justify-content: space-between;
  background-color: ${theme.color.primary};
  // font-size: 2rem;
  margin: 0;
`;

const ModalTitle = styled.p`
  font-size: 2.25rem;
  margin: 0;
`;

const UsersListContainer = styled.div`
  height: 88%;
  overflow-y: scroll;
`;
