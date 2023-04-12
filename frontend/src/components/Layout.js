import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
