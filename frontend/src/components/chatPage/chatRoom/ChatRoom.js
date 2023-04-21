import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import theme from "../../../utils/theme";
import MessageBubbleLeft from "./MessageBubbleLeft";
import MessageBubbleRight from "./MessageBubbleRight";
import JoiningMessage from "./JoiningMessage";
import {
  getSocket,
  sendMessage,
  isInRoom,
  joinRoom,
} from "../../../utils/socket";

const socket = getSocket();

const ChatRoom = ({ username, currentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessagesToSend] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isJoinRoom, setIsJoinRoom] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [anchorElement, setAnchorElement] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenMenu = (event) => {
    console.log(event);
    setAnchorElement(event.currentTarget);
    setIsMenuOpen(true);
  };

  const onCloseMenu = () => {
    setAnchorElement(null);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      setMessages([...messages, message]);
      console.log("all Messages", messages);
    });
  }, [messages]);

  useEffect(() => {
    isInRoom(currentRoom);
    socket.on("checkRoomResult", ({ isJoin, name }) => {
      if (name === username) {
        if (isJoin) {
          setIsJoinRoom(true);
        } else {
          setIsJoinRoom(false);
        }
      }
    });
  }, [currentRoom]);

  useEffect(() => {
    socket.on("roomUsers", ({ users }) => {
      setUsersList(users);
    });
  }, []);

  const onSend = (event) => {
    event.preventDefault();
    const message = event.target[0].value;
    sendMessage(message);
  };

  const onJoinRoom = () => {
    joinRoom(username, currentRoom);
    setIsJoinRoom(true);
  };

  const ChatPage = () => {
    return (
      <ContentContainer>
        <NameWrapper>
          <RoomTitle>{currentRoom}</RoomTitle>
          <Button
            onClick={onOpenModal}
            sx={{ backgroundColor: theme.color.white, margin: "10px" }}
          >
            Users List
          </Button>
          <Modal
            open={isModalOpen}
            onClose={onCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
          >
            <ModalContainer>
              <ModalTitleContainer id="modal-title">
                <ModalTitle>Users List</ModalTitle>
                <Button
                  onClick={onCloseModal}
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
          <IconButton onClick={onOpenMenu}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            open={isMenuOpen}
            onClose={onCloseMenu}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem onClick={onCloseMenu}>Leave Room</MenuItem>
          </Menu>
        </NameWrapper>
        <ChatContent>
          {messages.map((msg) =>
            msg.username === undefined ? (
              <JoiningMessage message={msg.text} />
            ) : msg.username === username ? (
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

  const JoinPage = () => {
    return (
      <ContentContainer>
        <div>{currentRoom}</div>
        <Button onClick={onJoinRoom}>Join</Button>
      </ContentContainer>
    );
  };

  return <>{isJoinRoom ? <ChatPage /> : <JoinPage />}</>;
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
