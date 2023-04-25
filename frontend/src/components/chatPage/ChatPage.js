import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ChatRoom from "./chatRoom/ChatRoom";
import DirectMessageRoom from "./chatRoom/DirectMessageRoom";
import { useLocation } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { getSocket, joinRoom } from "../../utils/socket";

const socket = getSocket();

const ChatPage = () => {
  const [currentTarget, setCurrentTarget] = useState(null);
  const [isDirectMessage, setIsDirectMessage] = useState(false);
  const [groupMessage, setGroupMessage] = useState([]);
  const [directMessage, setDirectMessage] = useState([]);
  const [lastDirectMessage, setLastDirectMessage] = useState();
  const [lastGroupMessage, setLastGroupMessage] = useState();
  const [directMessageHistories, setDirectMessageHistories] = useState([]);
  const [groupMessageHistories, setGroupMessageHistories] = useState([]);
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
        setLastDirectMessage(message);
      }
    });
  }, [directMessage, location.state.username]);

  useEffect(() => {
    if(!lastDirectMessage) return;
    let newMessageHistory = lastDirectMessage;
    if(lastDirectMessage.sender === location.state.username) {
      newMessageHistory['title'] = lastDirectMessage['receiver'];
    } else {
      newMessageHistory['title'] = lastDirectMessage['sender'];
    }
    if(directMessageHistories) {
      let existed = false;
      directMessageHistories.forEach((message, index) => {
        console.log(message);
        if(newMessageHistory.title === message.title) {
          setDirectMessageHistories([
            ...directMessageHistories.slice(0, index),
            newMessageHistory,
            ...directMessageHistories.slice(index+1),
          ]);
          existed = true;
        }
      });
      if(!existed) {
        setDirectMessageHistories([...directMessageHistories, newMessageHistory]);
      }
    } else {
      setDirectMessageHistories([newMessageHistory]);
    }
  }, [lastDirectMessage, location]);

  useEffect(() => {
    if(!lastGroupMessage) return;
    if(groupMessageHistories) {
      let existed = false;
      groupMessageHistories.forEach((message, index) => {
        if(lastGroupMessage.room === message.room) {
          setGroupMessageHistories([
            ...groupMessageHistories.slice(0, index),
            lastGroupMessage,
            ...groupMessageHistories.slice(index+1),
          ]);
          existed = true;
        }
      });
      if(!existed) {
        setGroupMessageHistories([...groupMessageHistories, lastGroupMessage]);
      } 
    } else {
      setGroupMessageHistories([lastGroupMessage]);
    }
  }, [lastGroupMessage]);

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
        setLastMessage={setLastGroupMessage}
      />
    );
  };

  return (
    <ContentContainer>
      <NavBar 
        username={location.state.username} 
        changeRoom={changeRoom} 
        directMessage={directMessageHistories} 
        groupMessage={groupMessageHistories}
      />
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
