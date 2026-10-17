import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { FaBars, FaShieldAlt } from "react-icons/fa";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col w-full overflow-x-hidden">
      {!user && <Navbar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

      {user ? (
        <div className="flex min-h-screen relative w-full">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile Topbar */}
            <div className="md:hidden flex items-center justify-between p-4 bg-gray-900/90 border-b border-gray-800 sticky top-0 z-30">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-white text-xl p-2.5 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                aria-label="Open sidebar"
              >
                <FaBars />
              </button>
              <Link to="/dashboard" className="flex items-center gap-2">
                <FaShieldAlt className="text-blue-400 text-xl" />
                <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Guardview.ai
                </span>
              </Link>
              <div className="w-8"></div>
            </div>

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/home" element={<Home user={user} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/features" element={<Features />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/home" element={<Home user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

export default App;
