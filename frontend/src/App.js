import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ChatRoom from "./components/chatRoom/ChatRoom";
import Layout from "./components/Layout";
import LoginPanel from "./components/loginPage/LoginPanel";

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
    // <div style={{ height: "100vh" }}>
    //   {/* <ChatRoom /> */}
    //   <LoginPanel />
    // </div>
    <RouterProvider router={router} />
  );
}

export default App;
