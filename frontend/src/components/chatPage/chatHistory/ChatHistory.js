import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatHistoryPerUser from "./ChatHistoryPerUser";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { Tab, Tabs} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from "@mui/material";
import { getSocket } from "../../../utils/socket";
import { useLocation } from "react-router-dom";

const socket = getSocket();

const ChatHistory = (props) => {
  const {groupMessage, directMessage} = props;

  const [groupMessageHistories, setGroupMessageHistories] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [value, setValue] = useState(0);

  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setGroupMessageHistories(groupMessage);
  }, [groupMessage]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{width: '100%'}}
        {...other}
      >
        {value === index && (
          <>
            {children}
          </>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    socket.on("roomUsers", ({ room, users }) => {
      console.log(" ",room);
      setChatRoom(room);
    });
  }, []);

  const renderSearch = () => (
    <InputWrapper>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search chat room or message"
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </InputWrapper>
  )

  const renderDirectMessageHistory = () => (
    directMessage.map((message, index) => (
      <ChatHistoryPerUser
        key={index}
        name={message.title}
        message={message.text}
        timestamp={message.time}
      />
    ))
  )

  return (
    <ContentContainer>
      <StyledTabs value={value} onChange={handleChange}>
        <Tab label="users"  {...a11yProps(0)}></Tab>
        <Tab label="groups"  {...a11yProps(1)}></Tab>
      </StyledTabs>
      <TabPanel value={value} index={0}>
        {renderSearch()}
        {directMessage && renderDirectMessageHistory()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderSearch()}
        {groupMessage && groupMessage.map((message, index) => (
          <ChatHistoryPerUser 
            name={message.room} 
            key={index}
            message={message.text}
            timestamp={message.time}
          />
        ))}
      </TabPanel>
    </ContentContainer>
  );
};

export default ChatHistory;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled(Paper)`
  display: flex;
  padding: '2px 4px';
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content : flex-start;
`;
