import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ChatRoom from "./chatRoom/ChatRoom";
import DirectMessageRoom from "./chatRoom/DirectMessageRoom";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import NavBar from "../navBar/NavBar";
import { getSocket, joinRoom, leaveRoom } from "../../utils/socket";

const socket = getSocket();

const ChatPage = () => {
  const [currentTarget, setCurrentTarget] = useState(null);
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const [groupMessage, setGroupMessage] = useState([]);
  const [directMessage, setDirectMessage] = useState([]);
  const location = useLocation();

  useEffect(() => {
    socket.on("sendDirectMessage", (message) => {
      const sender = message.sender;
      const receiver = message.receiver;
      if (
        sender === location.state.username ||
        receiver === location.state.username
      ) {
        setDirectMessage([...directMessage, message]);
      }
    });
  }, [directMessage]);

  const changeRoom = (target, isDirect) => {
    if (isDirect) {
      setIsDirectMessage(true);
    } else {
      setIsDirectMessage(false);
      joinRoom(location.state.username, target);
    }
    setCurrentTarget(target);
  };

  console.log("directMessage", directMessage);
  console.log("groupMessage", groupMessage);

  const direct = () => {
    return (
      <DirectMessageRoom
        username={location.state.username}
        talker={currentTarget}
        messages={directMessage}
        setMessages={setDirectMessage}
      />
    );
  };

  const room = () => {
    return (
      <ChatRoom
        username={location.state.username}
        currentRoom={currentTarget}
        messages={groupMessage}
        setMessages={setGroupMessage}
      />
    );
  };

  return (
    <ContentContainer>
      <NavBar username={location.state.username} changeRoom={changeRoom} />
      {isDirectMessage && direct()}
      {!isDirectMessage && room()}
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
