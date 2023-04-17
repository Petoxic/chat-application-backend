import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatHistory from "./components/chatHistory/ChatHistory";
import ChatRoom from "./components/chatRoom/ChatRoom";
import Layout from "./components/Layout";
import LoginPanel from "./components/loginPage/LoginPanel";

import styled from "@emotion/styled";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LoginPanel /> },
      { path: "/chat", element: <ChatRoom /> },
    ],
  },
]);

function App() {
  return (
    // <Container>
    //   <ChatHistory/>
    //   {/* <ChatHistory/>
    //    <ChatRoom />
    //    <LoginPanel /> */}
    //   <RouterProvider router={router} />
    // </Container>

    <RouterProvider router={router} />
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;



export default App;
