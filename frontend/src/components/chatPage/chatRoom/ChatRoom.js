import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Input, Button, Modal } from "@mui/material";
import { useLocation } from "react-router-dom";

import theme from "../../../utils/theme";
import MessageBubbleLeft from "./MessageBubbleLeft";
import MessageBubbleRight from "./MessageBubbleRight";
import JoiningMessage from "./JoiningMessage";
import { getSocket, sendMessage } from "../../../utils/socket";

const moment = require("moment");
const socket = getSocket();

const ChatRoom = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessagesToSend] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const usersList = [
    { username: "user1" },
    { username: "user1" },
    { username: "user1" },
    { username: "user1" },
    { username: "user1" },
    { username: "user1" },
    { username: "user1" },
    { username: "user1" },
    { username: "user1" },
    { username: "user1" },
  ];

  const openHandler = () => {
    setIsModalOpen(true);
  };

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("all Messages", message);
      setMessages([message]);
    });
  }, []);

  const onSend = () => {
    sendMessage(messageToSend);
    socket.on("message", (message) => {
      console.log("all Messages", message);
      setMessages([...messages, message]);
    });
    setMessagesToSend("");
  };

  return (
    <ContentContainer>
      <NameWrapper>
        <RoomTitle>Eiei</RoomTitle>
        <Button
          onClick={openHandler}
          sx={{ backgroundColor: theme.color.white, margin: "10px" }}
        >
          Users List
        </Button>
        <Modal
          open={isModalOpen}
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
          message={`${moment().format("h:mm a")}: ${username} join the chat!`}
        />
        {messages.map((msg) =>
          msg.username === username ? (
            <MessageBubbleRight message={msg.text} time={msg.time} />
          ) : (
            <MessageBubbleLeft
              name={msg.username}
              message={msg.text}
              time={msg.time}
            />
          )
        )}
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
