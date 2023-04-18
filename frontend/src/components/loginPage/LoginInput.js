import React from "react";
import styled from "@emotion/styled";
import {
  Input,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { joinChat } from "../../utils/socket";
import theme from "../../utils/theme";

const LoginInput = () => {
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    joinChat(username);
    navigate("/chat", { state: { username } });
  };

  return (
    <ContentContainer onSubmit={submitHandler}>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel>Username</InputLabel>
        <Input id="username" placeholder="Enter username" />
      </FormControl>

      <Button
        type="join"
        sx={{ width: "100%", backgroundColor: theme.color.white }}
      >
        Join Chat
      </Button>
    </ContentContainer>
  );
};

export default LoginInput;

const ContentContainer = styled.form`
  width: 100%;
  height: 35%;
  background-color: ${theme.color.ternary};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem 2.5rem;
  box-sizing: border-box;
`;
