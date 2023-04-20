import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <main style={{ height: "100%" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
