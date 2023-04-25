import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPanel from "./components/loginPage/LoginPanel";
import ChatPage from "./components/chatPage/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LoginPanel /> },
      { path: "/chat", element: <ChatPage /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}


export default App;
