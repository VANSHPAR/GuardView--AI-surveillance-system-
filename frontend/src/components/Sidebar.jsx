import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import {
  FaTachometerAlt,
  FaBell,
  FaHistory,
  FaUser,
  FaChartBar,
  FaHome,
  FaSignOutAlt,
  FaCog,
  FaShieldAlt
} from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setSidebarOpen(false);
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt className="text-blue-400" /> },
    { name: "Alerts", path: "/alerts", icon: <FaBell className="text-yellow-400" /> },
    { name: "History", path: "/history", icon: <FaHistory className="text-green-400" /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartBar className="text-red-400" /> },
    { name: "Profile", path: "/profile", icon: <FaUser className="text-purple-400" /> },
    { name: "Settings", path: "/settings", icon: <FaCog className="text-cyan-400" /> },
  ];

  const marketingItems = [
    { name: "Home", path: "/", icon: <FaHome className="text-cyan-400" /> },
    { name: "Features", path: "/features", icon: <span className="text-indigo-400">⚡</span> },
    { name: "About", path: "/about", icon: <span className="text-pink-400">ℹ️</span> },
    { name: "Pricing", path: "/pricing", icon: <span className="text-yellow-400">💰</span> },
    { name: "Contact", path: "/contact", icon: <span className="text-green-400">📧</span> },
  ];

  const isCurrent = (path) => location.pathname === path;

  return (
    <div
      className={`w-64 sm:w-72 md:w-64 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col justify-between fixed md:relative z-50 md:z-auto transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:block shadow-2xl border-r border-gray-800 flex-shrink-0`}
    >
      <div>
        {/* Header / Brand */}
        <div className="flex justify-between items-center p-5 border-b border-gray-800">
          <Link to="/dashboard" className="flex items-center gap-2">
            <FaShieldAlt className="text-blue-400 text-2xl" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Guardview.ai
            </h2>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-2xl hover:text-gray-300 md:hidden p-1 rounded-lg"
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="py-4 px-3">
          <div className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Surveillance
          </div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 py-2.5 px-3 rounded-xl text-base transition-all duration-200 ${
                    isCurrent(item.path)
                      ? "bg-gradient-to-r from-blue-600/30 to-purple-600/20 text-white border-l-4 border-blue-500 font-semibold shadow-inner"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Marketing Navigation */}
          <div className="pt-6 px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Platform Pages
          </div>
          <ul className="space-y-1">
            {marketingItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 py-2 px-3 rounded-xl text-sm transition-all duration-200 ${
                    isCurrent(item.path)
                      ? "bg-gray-800 text-white font-medium"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User profile footer & logout */}
      <div className="p-4 border-t border-gray-800 bg-black/20">
        {user && (
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow">
              {user.firstName ? user.firstName[0].toUpperCase() : "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email}
              </p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Admin
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 py-2.5 px-3 hover:bg-red-600/20 rounded-xl text-sm font-medium transition-all w-full text-red-400 hover:text-red-300 border border-red-500/20"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
