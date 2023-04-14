import React from "react";
import styled from "@emotion/styled";
import {
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import theme from "../../utils/theme";

const socket = io("http://localhost:3001");

const LoginInput = () => {
  const navigate = useNavigate();

  const mockedUser = [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5",
    "user6",
    "user7",
    "user8",
  ];

  const UsersList = mockedUser.map((user) => {
    return <p>{user}</p>;
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const room = event.target[1].value;
    console.log(username, room);
    socket.emit("joinRoom", { username, room });
    navigate("/chat", { state: { username, room } });
  };

  return (
    <ContentContainer onSubmit={submitHandler}>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel>Username</InputLabel>
        <Input id="username" placeholder="Enter username" />
      </FormControl>

      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel>Room</InputLabel>
        <Select label="Room" name="room">
          <MenuItem value="Javascript">Javascript</MenuItem>
          <MenuItem value="Python">Python</MenuItem>
        </Select>
      </FormControl>

      <ClientsContainer>
        <TitleContainer>
          <GroupsIcon />
          Clients
        </TitleContainer>
        <div style={{ overflow: "scroll" }}>{UsersList}</div>
      </ClientsContainer>

      <Button
        type="submit"
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
  height: 85%;
  background-color: ${theme.color.ternary};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.25rem 2.5rem;
  box-sizing: border-box;
`;

const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;
