import React, { useState, useEffect } from  "react";
import styled from "styled-components";
import { GroupAdd, Search } from "@mui/icons-material";
import { Button, IconButton, Paper, InputBase, Modal, Input } from "@mui/material";
import {
  getSocket,
  joinRoom,
  createRoom,
} from "../../../utils/socket";

const socket = getSocket();

const mockRoomList = [
  {name: "redroom", id: "1234"},
  {name: "eren", id: "5678"}
]

const JoinRoom =  (props) => {
  const { username } = props;
  const [roomList, setRoomList] = useState([]);
  const [isCreatingRoom, setCreatingRoom] = useState(false);
  const [roomName, setRoomName] = useState("...");

  useEffect(() => {
    // setRoomList(mockRoomList);
    // get unjoin room list
    socket.emit("getUnjoinRooms", (username))
    socket.on("unjoinRoomList", ({ rooms }) => {
      setRoomList(rooms);
    });
  }, [roomList])


  const onJoinRoom = (room) => {
    joinRoom(username, room);
  };

  const onCreateRoom = () => {
    console.log('onCreateRoom', username, roomName);
    createRoom(username, roomName);
    socket.emit("getJoinRooms", (username));
  };

  const handleClose = () => {
    setCreatingRoom(false);
    setRoomName("");
  }

  const renderSearch = () => (
    <InputWrapper>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search group name"
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
    </InputWrapper>
  );

  // const renderModal = () => (
  //   // <Modal
  //   //   open={isCreatingRoom}
  //   //   onClose={() => handleClose()}
  //   //   style={{width: 100, height: 100}}
  //   // >
  //   //   {/* <Input
  //   //     value={roomName}
  //   //     onChange={(e) => setRoomName(e.target.value)}
  //   //     placeholder="room name"
  //   //   />
  //   //   <Button onClick={() => onCreateRoom()}/> */}
  //   // </Modal>
  // )

  return(
    <ContentContainer>
      <Button onClick={() => onCreateRoom()}>Create Chat Group</Button>
      {/* {renderModal()} */}
      {renderSearch()}
      {roomList.map((room) => (
        <JoinRoomWrapper>
          {room.name} 
          <GroupAdd
            color="disabled"
            fontSize="small"
            onClick={() => onJoinRoom(room.id)}
          />
        </JoinRoomWrapper>
      ))}
    </ContentContainer>
  )
}

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const JoinRoomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const InputWrapper = styled(Paper)`
  display: flex;
  padding: '2px 4px';
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

export default JoinRoom;