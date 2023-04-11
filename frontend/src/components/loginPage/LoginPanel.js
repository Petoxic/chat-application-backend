import React from "react";
import styled from "@emotion/styled";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

import theme from "../../utils/theme";
import LoginInput from "./LoginInput";

const LoginPanel = () => {
  return (
    <ContentContainer>
      <TitleBar>
        <SentimentSatisfiedAltIcon fontSize="large" />
        eiei
      </TitleBar>
      <LoginInput />
    </ContentContainer>
  );
};

export default LoginPanel;

const ContentContainer = styled.div`
  width: 50%;
  height: 60%;
`;

const TitleBar = styled.div`
  width: 100%;
  height: 15%;
  background-color: ${theme.color.primary};
  font-size: 2.25rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
