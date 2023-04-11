import React from "react";
import styled from "@emotion/styled";
import {
  Input,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";

import theme from "../../utils/theme";

const LoginInput = () => {
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

  return (
    <ContentContainer>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel>Username</InputLabel>
        <Input placeholder="Enter username" />
      </FormControl>

      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel>Room</InputLabel>
        <Select label="Room">
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

      <Button sx={{ width: "100%", backgroundColor: theme.color.white }}>
        Join Chat
      </Button>
    </ContentContainer>
  );
};

export default LoginInput;

const ContentContainer = styled.div`
  width: 100%;
  height: 85%;
  background-color: ${theme.color.ternary};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0 2.5rem;
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
