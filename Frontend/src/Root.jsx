import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./modules/sharedComponents/Navbar";
import Sidebar from "./modules/sharedComponents/Sidebar";
const Root = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 h-screen ml-0 md:ml-56 mt-15 bg-neutral-100">
        <Outlet />
      </div>
    </div>
  );
};
export default Root;
