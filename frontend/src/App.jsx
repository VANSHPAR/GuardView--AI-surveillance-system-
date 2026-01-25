import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; //  Import Navigate
import { FaBars } from "react-icons/fa";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRouter from "./components/PrivateRouter";
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
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-screen bg-gray-900 flex flex-col">
      {!user && <Navbar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

      {user ? (
        <div className="flex relative">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          <div className="flex-1 p-4 md:ml-0">
            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-white text-2xl p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors touch-manipulation"
                aria-label="Open sidebar"
              >
                <FaBars />
              </button>
            </div>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/settings" element={<div>Settings Page</div>} />
              {/* Redirect unknown routes to Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />



          {/*  Redirect unauthorized users to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
