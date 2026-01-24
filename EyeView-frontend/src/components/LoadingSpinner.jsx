import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-600 border-t-blue-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-4 text-center"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;