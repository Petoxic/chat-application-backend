import React from "react";
import styled from "@emotion/styled";

import theme from "../../../utils/theme";

const JoiningMessage = ({message}) => {
  return (
    <ContentContainer>
      <MessageWrapper>{message}</MessageWrapper>
    </ContentContainer>
  );
};

export default JoiningMessage;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MessageWrapper = styled.p`
  width: 70%;
  background-color: ${theme.color.secondary};
  border: 1px solid ${theme.color.primary};
  border-radius: 5px;
  text-align: center;
`;
