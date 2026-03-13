import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState("/");
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Employees", path: "/employees" },
    { name: "Departments", path: "/departments" },
    { name: "Salary", path: "/salary" },
    { name: "Users", path: "/users" },
  ];
  useEffect(() => {
    const currentPath = location.pathname;
    const currentLink = links.find((link) => link.path === currentPath);

    if (currentLink) {
      setSelectedLink(currentLink.name.toLowerCase());
      setIsSidebarOpen(false);
    } else {
      setSelectedLink(null);
    }
  }, [location.pathname]);
  return (
    <Fragment>
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed bg-[rgba(0,0,0,0.5)] w-full h-screen top-15 z-2 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      ></div>
      {/* sidebar  */}
      <div
        className={`fixed top-15 w-56 min-h-screen max-h-screen flex  flex-col justify-between border-e border-gray-100 bg-white border-t  ${
          isSidebarOpen ? "left-[0%]" : "left-[-100%]"
        }  md:left-0                
        transition-all duration-300 ease-in-out z-10`}
      >
        <div className="px-4 py-6">
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelectedLink(link.path);
                    navigate(link.path);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full text-left block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-slate-900 hover:text-slate-100 ${
                    selectedLink === link.name.toLowerCase() ||
                    selectedLink === link.path
                      ? "bg-slate-900 text-slate-100"
                      : ""
                  }`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
export default Sidebar;
