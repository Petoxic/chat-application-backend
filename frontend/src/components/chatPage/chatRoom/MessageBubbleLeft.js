import React from "react";
import styled from "@emotion/styled";
import { Avatar, Typography } from "@mui/material";
import theme from "../../../utils/theme";

const MessageBubbleLeft = ({name, message, time}) => {
  return (
    <ChatMessageContainer>
      <InformationContainer>
        <Avatar />
        <TextContainer>
          <Name>{name}</Name>
          <MessageContainer>
            <MessageBubble>
              <Message>{message}</Message>
            </MessageBubble>
            <TimeStamp>{time}</TimeStamp>
          </MessageContainer>
        </TextContainer>
      </InformationContainer>
    </ChatMessageContainer>
  );
};

const ChatMessageContainer = styled.div`
  display: flex;
  padding: 5px;
`;

const InformationContainer = styled.div`
  display: flex;
  gap: 10%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled(Typography)`
  font-size: 16px;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`;

const MessageBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.color.primary};
  border-radius: 1px 10px 10px;
  min-width: 100px;
  width: 100%;
  min-height: 30px;
  background-color: ${theme.color.secondary};
`;

const Message = styled(Typography)`
  font-size: 14px;
`;

const TimeStamp = styled(Typography)`
  font-size: 12px;
  color: ${theme.color.gray2};
`;

export default MessageBubbleLeft;
