import React from "react";
import styled from "@emotion/styled";

import theme from "../../utils/theme";

const ChatRoom = () => {
  return (
    <ContentContainer>
      <NameWrapper>Worachot</NameWrapper>
      <MessageContainer>
        <MessageBox />
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

const NameWrapper = styled.p`
  width: 100%;
  height: 10%;
  background-color: ${theme.color.primary};
  font-size: 2.25rem;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
`;

const MessageBox = styled.input`
  placeholder: "eiei";
  font-size: 1.5rem;
`;
