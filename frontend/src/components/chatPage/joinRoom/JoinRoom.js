import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GroupAdd, Search } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Paper,
  InputBase,
  Input,
} from "@mui/material";
import { getSocket, joinRoom, createRoom, searchRoom } from "../../../utils/socket";

const socket = getSocket();

const JoinRoom = (props) => {
  const { username } = props;
  const [roomList, setRoomList] = useState([]);
  const [isCreatingRoom, setCreatingRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    socket.emit("getUnjoinRooms", username);
    socket.emit("searchRooms", {searchInput, username});
  }, [username]);

  socket.on("roomCreated", () => {
    socket.emit("getUnjoinRooms", username);
  });

  socket.on("searchResult", ({name, rooms}) => {
    if (name === username) {
      setRoomList(rooms);
    }
  });

  const onJoinRoom = (room) => {
    joinRoom(username, room);
    socket.emit("getUnjoinRooms", username);
  };

  const onCreateRoom = () => {
    console.log("onCreateRoom", username, roomName);
    createRoom(username, roomName);
    socket.emit("getJoinRooms", username);
    toggleCreateRoom()
  };

  const toggleCreateRoom = () => {
    setCreatingRoom(!isCreatingRoom);
    setRoomName("");
  };

  const handleSearch = () => {
    console.log('searchInput', searchInput);
    searchRoom(searchInput, username);
  };

  const renderSearch = () => (
    <InputWrapper>
      <InputBase 
        sx={{ ml: 1, flex: 1 }} 
        placeholder="Search group name" 
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <IconButton 
        type="button" 
        sx={{ p: "10px" }} 
        aria-label="search"
        onClick={() => handleSearch()}
      >
        <Search/>
      </IconButton>
    </InputWrapper>
  );

  const renderCreatRoom = () => (
    <CreateRoomContainer>
      <Input 
        value={roomName}
        sx={{width:'70%'}}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="group name"
      />
      <Button onClick={() => onCreateRoom()}>Create</Button>
    </CreateRoomContainer>
  );

  return (
    <ContentContainer>
      <Button onClick={() => toggleCreateRoom()}>Create Chat Group</Button>
      {isCreatingRoom && renderCreatRoom()}
      {renderSearch()}
      {roomList.map((room) => (
        <JoinRoomWrapper>
          {room.roomName}
          <GroupAdd
            color="disabled"
            fontSize="small"
            onClick={() => onJoinRoom(room.roomName)}
          />
        </JoinRoomWrapper>
      ))}
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CreateRoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const JoinRoomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const InputWrapper = styled(Paper)`
  display: flex;
  padding: "2px 4px";
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

export default JoinRoom;
