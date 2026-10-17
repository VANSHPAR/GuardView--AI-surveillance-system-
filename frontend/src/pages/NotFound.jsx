import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaHome, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const NotFound = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800/80 border border-gray-700 rounded-3xl p-8 backdrop-blur-sm shadow-2xl"
      >
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
          <FaShieldAlt className="text-blue-400 text-3xl" />
        </div>

        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          404
        </h1>
        <h2 className="text-xl font-bold text-gray-200 mb-3">Page Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">
          The surveillance sector or page you are trying to reach does not exist or has been moved.
        </p>

        <Link
          to={user ? "/dashboard" : "/"}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
        >
          {user ? (
            <>
              <FaTachometerAlt />
              Back to Dashboard
            </>
          ) : (
            <>
              <FaHome />
              Back to Home
            </>
          )}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
