import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Input,
  Button,
  Modal,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { Chat, ChatOutlined, MoreVert, PushPin } from "@mui/icons-material";

import theme from "../../../utils/theme";
import MessageBubbleLeft from "./MessageBubbleLeft";
import MessageBubbleRight from "./MessageBubbleRight";
import JoiningMessage from "./JoiningMessage";
import {
  getSocket,
  sendMessage,
  isInRoom,
  joinRoom,
  leaveRoom,
  getUsersInRoom,
  getPinnedMessage,
  sendDirectMessage,
} from "../../../utils/socket";

const socket = getSocket();

const DirectMessageRoom = ({ username, talker }) => {
  const [messages, setMessages] = useState([]);
  const [isJoinRoom, setIsJoinRoom] = useState(false);
  const [pinnedMessage, setPinnedMessage] = useState(null);

  useEffect(() => {
    socket.on("sendDirectMessage", (message) => {
      const sender = message.sender;
      const receiver = message.receiver;
      if (
        (sender === username || sender === talker) &&
        (receiver === username || receiver === talker)
      ) {
        setMessages([...messages, message]);
      }
    });
  }, [messages, talker]);

  useEffect(() => {
    socket.on("sendPinnedMessage", (message) => {
      setPinnedMessage(message);
    });
  }, [pinnedMessage]);

  useEffect(() => {
    getPinnedMessage(talker);
  }, [talker]);

  const onSend = (event) => {
    event.preventDefault();
    const message = event.target[0].value;
    sendDirectMessage(username, talker, message);
  };

  // const onJoinRoom = () => {
  //   joinRoom(username, talker);
  //   setIsJoinRoom(true);
  // };

  const ChatPage = () => {
    return (
      <ContentContainer>
        <NameWrapper>
          <RoomTitle>{talker}</RoomTitle>
        </NameWrapper>
        {pinnedMessage !== null && (
          <PinnedMessageContainer>
            <PushPin sx={{ transform: "rotate(45deg)" }} />
            <PinnedMessageWrapper>
              {pinnedMessage.username} : {pinnedMessage.time} {" >> "}
              {pinnedMessage.text}
            </PinnedMessageWrapper>
          </PinnedMessageContainer>
        )}

        <ChatContent>
          {messages.map((msg) =>
            msg.room === talker ? (
              msg.username === undefined ? (
                <JoiningMessage message={msg.text} />
              ) : msg.username === username ? (
                <MessageBubbleRight
                  message={msg.text}
                  time={msg.time}
                  room={talker}
                />
              ) : (
                <MessageBubbleLeft
                  name={msg.username}
                  message={msg.text}
                  time={msg.time}
                />
              )
            ) : null
          )}
          {messages.map((msg) => {
            msg.sender === username && msg.receiver === talker ? (
              <MessageBubbleRight message={msg.text} time={msg.time} />
            ) : msg.sender === talker && msg.receiver === username ? (
              <MessageBubbleLeft
                name={msg.sender}
                message={msg.text}
                time={msg.time}
              />
            ) : null;
          })}
        </ChatContent>
        <MessageContainer>
          <FormContainer onSubmit={onSend}>
            <FormControl variant="standard" sx={{ width: "85%" }}>
              <Input
                id="user-message"
                placeholder="Enter a message"
                disableUnderline
                sx={{
                  fontSize: "1rem",
                  width: "100%",
                  height: "80%",
                  backgroundColor: theme.color.white,
                  borderRadius: "10px",
                  margin: "10px",
                  paddingLeft: "10px",
                }}
              />
            </FormControl>
            <Button
              type="join"
              sx={{ backgroundColor: theme.color.white, margin: "10px" }}
            >
              Send
            </Button>
          </FormContainer>
        </MessageContainer>
      </ContentContainer>
    );
  };

  const NotChatPage = () => {
    return (
      <NotChatPageContainer>
        <ChatOutlined color="primary" sx={{ fontSize: 200 }} />
        <Typography variant="h3">Join room to start chatting!!</Typography>
      </NotChatPageContainer>
    );
  };

  return <ChatPage />;
};

export default DirectMessageRoom;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const NotChatPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 5%;
`;

const NameWrapper = styled.div`
  width: 100%;
  height: 6%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 7px;
  background-color: ${theme.color.primary};
`;

const PinnedMessageContainer = styled.div`
  width: 100%;
  height: 6%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.25rem;
  gap: 10px;
  padding-left: 5px;
  background-color: ${theme.color.gray0};
  text-overflow: ellipsis;
`;

const PinnedMessageWrapper = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  justify-content: space-between;
`;

const ChatContent = styled.div`
  width: 100%;
  height: 88%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ModalContainer = styled.div`
  width: 50%;
  height: 50%;
  transform: translate(50%, 50%);
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: ${theme.color.white};
`;

const ModalTitleContainer = styled.div`
  height: 12%;
  display: flex;
  flex-display: row;
  justify-content: space-between;
  background-color: ${theme.color.primary};
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
