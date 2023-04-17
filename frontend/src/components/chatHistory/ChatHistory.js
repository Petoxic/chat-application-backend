import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatHistoryPerUser from "./ChatHistoryPerUser";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from "@mui/material";
import { getSocket } from "../../utils/socket";

const socket = getSocket();

const mockMessageHistories = [
  {name: 'Pattrawut', message: 's', timestamp: '10.20pm'},
  {name: 'Pattanan', message: 'เค', timestamp: '6.20am'},
  {name: 'Mokha', message: 'f', timestamp: '6.20am'}
]

const ChatHistory = () => {
  const [messageHistories, setMessageHistories] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageHistories([message]);
    });
  }, []);

  useEffect(() => {
    socket.on("roomUsers", ({ room, users }) => {
      console.log(" ",room);
      setChatRoom(room);
    });
  }, []);

  return (
    <ContentContainer>
      <InputWrapper>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search chat room or message"
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </InputWrapper>
      {messageHistories.map((message) => (
        <ChatHistoryPerUser 
          name={chatRoom} 
          message={message.text}
          timestamp={message.time}
        />
      ))}
    </ContentContainer>
  );
};

export default ChatHistory;

const ContentContainer = styled.div`
  width: 440px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled(Paper)`
  display: flex;
  padding: '2px 4px';
  align-items: center;
  margin-bottom: 10px;
  width: 400px;
`;
