import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import {
  FaTachometerAlt,
  FaBell,
  FaHistory,
  FaUser,
  FaChartBar,
  FaHome,
  FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setSidebarOpen(false);
  };

  return (
    <div className={`w-64 sm:w-72 md:w-60 min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col justify-between fixed md:relative z-50 md:z-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block shadow-2xl`}>
      <div>
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">eyeview.ai</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-white text-2xl hover:text-gray-300 transition-colors">
            <FiX />
          </button>
        </div>
        <h2 className="text-2xl font-bold p-4 hidden md:block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">eyeview.ai</h2>
        <ul className="space-y-2 px-4">
          {/* Dashboard Section */}
          <li>
            <Link to="/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <FaTachometerAlt className="text-blue-400" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/alerts" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <FaBell className="text-yellow-400" />
              Alerts
            </Link>
          </li>
          <li>
            <Link to="/history" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <FaHistory className="text-green-400" />
              History
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <FaUser className="text-purple-400" />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/analytics" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <FaChartBar className="text-red-400" />
              Analytics
            </Link>
          </li>

          {/* Marketing Pages Section */}
          <li className="pt-4">
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Marketing
            </div>
          </li>
          <li>
            <Link to="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <FaHome className="text-cyan-400" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/features" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <span className="text-indigo-400">⚡</span>
              Features
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <span className="text-pink-400">ℹ️</span>
              About
            </Link>
          </li>
          <li>
            <Link to="/pricing" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <span className="text-yellow-400">💰</span>
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 py-3 px-3 hover:bg-gray-700 rounded-lg text-lg transition-all duration-200 hover:translate-x-1">
              <span className="text-green-400">📧</span>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom section with Logout */}
      <div className="p-4 border-t border-gray-700">
        <ul className="space-y-2">
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-3 px-3 hover:bg-red-600/20 rounded-lg text-lg transition-all duration-200 hover:translate-x-1 w-full text-left text-red-400 hover:text-red-300"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
