import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { motion } from "framer-motion";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome } from 'react-icons/fi';
import { FaTachometerAlt } from 'react-icons/fa';

const navVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const navItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.4 },
  }),
};

const Navbar = ({ user, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ["Home", "Features", "About", "Pricing", "Contact"];

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-white/10"
      >
        <div className="flex justify-between items-center w-11/12 max-w-7xl py-4 mx-auto">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-300">
            eyeview.ai
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-8">
              {navLinks.map((item, i) => (
                <motion.li
                  key={item}
                  variants={navItem}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white font-medium transition-colors duration-300 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-x-4">
            {!user && (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-6 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    <FiUser size={18} />
                    Login
                  </motion.button>
                </Link>
                <Link to="/pricing">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}

            {user && (
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    await logout();
                    navigate("/");
                  }}
                  className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 font-medium py-2.5 px-4 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <FiLogOut size={18} />
                  Logout
                </motion.button>
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-4 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    <FiHome size={18} />
                    Home
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (user) {
                  // Logged-in users: mobile gets sidebar, larger screens get mobile menu
                  if (window.innerWidth < 768) {
                    setSidebarOpen(!sidebarOpen);
                  } else {
                    setMobileMenuOpen(!mobileMenuOpen);
                  }
                } else {
                  // Non-logged-in users get mobile menu
                  setMobileMenuOpen(!mobileMenuOpen);
                }
              }}
              className="md:hidden p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              <FiMenu size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
        >
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 w-full h-full flex flex-col items-center justify-center border-b border-white/10"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
            >
              <FiX size={24} />
            </button>

            {/* Mobile Brand */}
            <div className="mb-12">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                eyeview.ai
              </span>
            </div>

            <ul className="text-center space-y-8 text-xl">
              {navLinks.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white font-medium transition-colors duration-300 block py-3 px-6 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/20"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Mobile CTA Buttons */}
            <div className="mt-12 flex flex-col gap-4 w-64">
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
                    >
                      <FiUser size={18} />
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 font-medium py-3 px-6 rounded-xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                    >
                      <FaTachometerAlt size={18} />
                      Dashboard
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      logout();
                      navigate("/");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 font-medium py-3 px-6 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
