import React from "react";
import styled from "@emotion/styled";
import ChatHistory from "./chatHistory/ChatHistory";
import ChatRoom from "./chatRoom/ChatRoom";
import { useLocation } from "react-router-dom";

const ChatPage = () => {
  const location = useLocation();

  console.log("lcoation -> ", location);

  return (
    <ContentContainer>
      <ChatHistory />
      <ChatRoom username={location.state.username} />
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
