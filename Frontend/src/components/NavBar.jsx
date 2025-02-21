import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaList, FaPlus, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/code.jpg";
import { useUserContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { userData, Logout } = useUserContext();

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex bg-gray-900 min-h-screen relative">
      {/* Left Sidebar */}
      <div
        className={`lg:flex bg-gradient-to-b from-gray-800 to-gray-700 text-white flex-col justify-between h-screen transition-all duration-500 ease-in-out ${isSidebarExpanded || isHovered ? "md:w-72 md:p-5 w-44 p-2.5" : "md:w-16 md:p-2"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <img
              src={logo}
              className={`${isSidebarExpanded || isHovered ? "md:w-14 md:h-14 w-10 h-10" : "md:w-12 md:h-12 w-10 h-10"} rounded-full shadow-lg`}
              alt="logo"
            />
            <div className={`flex items-center justify-between w-full ${isSidebarExpanded || isHovered ? "" : "hidden"}`}>
              <h2 className="font-serif font-bold text-md md:text-lg lg:text-xl tracking-wide">
                DevFix Hub
              </h2>
              <span
                onClick={handleSidebarToggle}
                className="text-xl cursor-pointer hover:text-gray-300 hidden md:block"
              >
                {isSidebarExpanded ? "⬅" : "✖"}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8">
            <ul className="flex flex-col gap-4">
              {[ 
                { icon: <FaList />, label: "View Issues", link: "/dashboard/issues" },
                { icon: <FaPlus />, label: "Register Issue", link: "/dashboard/register-issue" }
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-orange-200 hover:bg-orange-300 text-gray-900 flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition hover:shadow-md"
                        : "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition hover:bg-gray-600 hover:shadow-md"
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className={`font-serif text-sm md:text-lg tracking-wide ${isSidebarExpanded || isHovered ? "" : "hidden"}`}>
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logout section */}
        <div 
          className="flex items-center gap-3 px-3 py-2 text-lg font-serif rounded-md cursor-pointer transition hover:bg-gray-600 hover:shadow-md"
          onClick={() => {
            Logout()
            navigate("/");
          }}
        >
          <span className="text-lg"><FaSignOutAlt /></span>
          <span className={`font-serif text-sm md:text-lg tracking-wide ${isSidebarExpanded || isHovered ? "" : "hidden"}`}>Logout</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full relative h-[100vh] overflow-y-auto bg-gray-900 shadow-lg text-white">
        {/* User Info Section */}
        <div className="flex items-center gap-4 p-4 bg-gray-800 shadow-md rounded-md mx-4 mt-4">
          <img src={userData.profilePictureUrl} className="w-12 h-12  object-contain rounded-full shadow-md border-2 border-gray-600" alt="User Profile" />
          <h2 className="text-lg font-semibold text-gray-300">Hi, {userData.userName}</h2>
        </div>
        
        {/* Outlet for other components */}
        <div className="h-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
