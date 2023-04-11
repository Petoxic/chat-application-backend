import React from "react";
import styled from "@emotion/styled";

import ChatRoom from "./components/chatRoom/ChatRoom";
import LoginPanel from "./components/loginPage/LoginPanel";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      {/* <ChatRoom /> */}
      <LoginPanel />
    </div>
  );
}

export default App;
