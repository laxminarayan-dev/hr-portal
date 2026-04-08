import { Link } from "react-router-dom";
import { X, Menu, BellDot, NotebookPen, User2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const [userMenu, setUserMenu] = useState(false);
  const menuRef = useRef();
  const showMenu = () => {
    setUserMenu(!userMenu);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  return (
    <nav className="fixed w-full flex justify-between items-center bg-white px-6 py-4 shadow-sm z-10">
      <div>
        <Link to="/" className="flex gap-2 justify-center items-center">
          <NotebookPen />
          <h1 className="text-lg font-bold font-m">HrFusion</h1>
        </Link>
      </div>
      <div>
        <ul className="flex gap-5 justify-center items-center ">
          {/* <li className="cursor-pointer">
            <BellDot size={20} />
          </li>
          <li
            ref={menuRef}
            className="border rounded-full p-1 cursor-pointer relative"
          >
            <User2 onClick={showMenu} size={18} />
            <div
              className={`${userMenu ? "flex" : "hidden"} 
              absolute z-5 top-8 bg-white w-35 right-1 py-1 pt-2 border border-stone-200 rounded-md shadow flex-col text-xs sm:text-sm`}
            >
              <h2 className="font-semibold mx-3">Admin Account</h2>
              <hr className="my-1 border-none h-[1px] w-full bg-slate-200" />
              <h2 className="hover:bg-black hover:text-white py-1 px-2 rounded-sm mx-1">
                Profile
              </h2>
              <h2 className="hover:bg-black hover:text-white py-1 px-2 rounded-sm mx-1">
                Settings
              </h2>
              <hr className="my-1 border-none h-[1px] w-full bg-slate-200" />
              <h2 className="hover:bg-red-600 hover:text-white py-1 px-2 rounded-sm mx-1">
                Logout
              </h2>
            </div>
          </li> */}

          <li className="block md:hidden cursor-pointer">
            <button
              aria-label="handlemenu"
              className="cursor-pointer"
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
