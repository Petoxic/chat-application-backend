import React, { useState } from "react";
import styled from "styled-components";
import ChatHistoryPerUser from "./ChatHistoryPerUser";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Box, Tab, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Paper } from "@mui/material";

const ChatHistory = (props) => {
  const { groupMessage, directMessage, changeRoom, username } = props;
  const [tabValue, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    if (newValue >= 0 && newValue <= 1) {
      setValue(newValue);
    }
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{ width: "100%" }}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const renderSearch = () => (
    <InputWrapper>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search chat room or message"
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </InputWrapper>
  );

  const handleChangeRoom = (event, title, isPrivate) => {
    event.preventDefault();
    changeRoom(title, isPrivate);
    if (!isPrivate) {
      handleChange(event, 1);
    }
  };

  const renderDirectMessageHistory = () =>
    directMessage.map((message, index) => (
      <ChatHistoryPerUser
        key={index}
        name={message.title}
        message={message.text}
        timestamp={message.time}
        onClick={(e) =>
          handleChangeRoom(
            e,
            username === message.sender ? message.receiver : message.sender,
            true
          )
        }
      />
    ));

  const renderGroupMessageHistory = () =>
    groupMessage.map((message, index) => (
      <ChatHistoryPerUser
        name={message.room}
        key={index}
        message={message.text}
        timestamp={message.time}
        onClick={(e) => handleChangeRoom(e, message.room, false)}
      />
    ));

  return (
    <ContentContainer>
      <StyledTabs value={tabValue} onChange={handleChange}>
        <Tab label="users" {...a11yProps(0)} />
        <Tab label="groups" {...a11yProps(1)} />
      </StyledTabs>
      <TabPanel value={tabValue} index={0}>
        {renderSearch()}
        {directMessage && renderDirectMessageHistory()}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        {renderSearch()}
        {groupMessage && renderGroupMessageHistory()}
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
  padding: "2px 4px";
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;

const StyledTabs = styled(Tabs)`
  display: flex;
  justify-content: flex-start;
`;
