import React, { useState } from "react";
import styled from "@emotion/styled";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import theme from "../../../utils/theme";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { pinMessage } from "../../../utils/socket";

const MessageBubbleRight = ({ message, time, room }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const onOpenOption = (event) => {
    setAnchor(event.currentTarget);
    setIsOptionOpen(true);
  };

  const onCloseOption = () => {
    setAnchor(null);
    setIsOptionOpen(false);
    setIsFocus(false);
  };

  const onPinMessage = () => {
    console.log("pinning message");
    pinMessage(room, message);
  };

  return (
    <ChatMessageContainer>
      <TextContainer>
        <MessageContainer
          onMouseEnter={() => setIsFocus(true)}
          onMouseLeave={() => setIsFocus(false)}
        >
          {isFocus ? (
            <IconButton onClick={onOpenOption}>
              <MoreVertIcon />
            </IconButton>
          ) : (
            <TimeStamp>{time}</TimeStamp>
          )}
          <Menu open={isOptionOpen} onClose={onCloseOption} anchorEl={anchor}>
            <MenuItem onClick={onPinMessage}>Pin Message</MenuItem>
          </Menu>
          <MessageBubble>
            <Message>{message}</Message>
          </MessageBubble>
        </MessageContainer>
      </TextContainer>
    </ChatMessageContainer>
  );
};

const ChatMessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 5px;
`;

const TextContainer = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  margin-right: 6px;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`;

const MessageBubble = styled.div`
  border: 1px solid ${theme.color.primary};
  border-radius: 10px 1px 10px 10px;
  background-color: ${theme.color.secondary};
  padding: 10px;
`;

const Message = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
`;

const TimeStamp = styled(Typography)`
  font-size: 12px;
  color: ${theme.color.gray2};
`;

export default MessageBubbleRight;
