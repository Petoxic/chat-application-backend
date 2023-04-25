import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Chat, GroupAdd, Person } from "@mui/icons-material";
import styled from "styled-components";
import ChatHistory from "../chatPage/chatHistory/ChatHistory";
import JoinRoom from "../chatPage/joinRoom/JoinRoom";
import MainTab from "../chatPage/mainTab/MainTab";

const NaveBarContainer = styled.div`
  margin-top: 2%;
  width: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const NavBar = (props) => {
  const { username, changeRoom, directMessage, groupMessage } = props;
  const [value, setValue] = useState(0);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box style={{ width: "25vw" }}>{children}</Box>}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    // Check if the newValue is within the range of available tab indexes
    if (newValue >= 0 && newValue <= 2) {
      setValue(newValue);
    }
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <>
      <NaveBarContainer>
        <Tabs
          value={value}
          onChange={handleChange}
          orientation="vertical"
          aria-label="Vertical tabs example"
        >
          <Tab icon={<Person />} {...a11yProps(0)} />
          <Tab icon={<Chat />} {...a11yProps(1)} />
          <Tab icon={<GroupAdd />} {...a11yProps(2)} />
        </Tabs>
      </NaveBarContainer>
      <TabPanel value={value} index={0}>
        <MainTab username={username} changeRoom={changeRoom} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChatHistory 
          directMessage={directMessage}
          groupMessage= {groupMessage}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <JoinRoom username={username} />
      </TabPanel>
    </>
  );
};

export default NavBar;
