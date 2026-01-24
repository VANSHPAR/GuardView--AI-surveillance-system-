import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
  FaCalendarAlt,
  FaIdBadge,
  FaEnvelope,
  FaUserCircle,
  FaShieldAlt,
  FaSignOutAlt
} from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:5000/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(response.data.user);
      setEditForm({
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        email: response.data.user.email
      });
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.put('http://localhost:5000/auth/profile', editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProfileData(response.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              User Profile
            </h1>
            <p className="text-gray-400 text-lg">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Avatar and Basic Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 shadow-2xl border border-gray-600">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <FaUserCircle className="text-white text-6xl" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center">
                      <FaShieldAlt className="text-white text-xs" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-2">
                    {profileData?.first_name} {profileData?.last_name}
                  </h2>
                  <p className="text-gray-400 mb-4">{profileData?.email}</p>

                  <div className="flex justify-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <FaIdBadge />
                      <span>ID: {profileData?.id?.slice(0, 8)}...</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-600">
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <FaCalendarAlt />
                      <span className="text-sm">
                        Member since {profileData?.created_at ? new Date(profileData.created_at).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Profile Details and Edit Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 shadow-2xl border border-gray-600">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <FaUser className="text-blue-400" />
                    Profile Information
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      isEditing
                        ? 'bg-gray-600 hover:bg-gray-500 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <FaTimes />
                        Cancel
                      </>
                    ) : (
                      <>
                        <FaEdit />
                        Edit Profile
                      </>
                    )}
                  </motion.button>
                </div>

                {isEditing ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleUpdateProfile}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300 flex items-center gap-2">
                          <FaUser className="text-blue-400" />
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={editForm.first_name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-600 border border-gray-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-300 flex items-center gap-2">
                          <FaUser className="text-purple-400" />
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          value={editForm.last_name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-600 border border-gray-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <FaEnvelope className="text-green-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-600 border border-gray-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                        required
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <FaSave />
                        Save Changes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
                      >
                        <FaTimes />
                        Cancel
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gray-600/50 rounded-xl p-6 border border-gray-500/30">
                        <div className="flex items-center gap-3 mb-3">
                          <FaUser className="text-blue-400 text-lg" />
                          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">First Name</span>
                        </div>
                        <p className="text-xl font-medium text-white">{profileData?.first_name}</p>
                      </div>

                      <div className="bg-gray-600/50 rounded-xl p-6 border border-gray-500/30">
                        <div className="flex items-center gap-3 mb-3">
                          <FaUser className="text-purple-400 text-lg" />
                          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Last Name</span>
                        </div>
                        <p className="text-xl font-medium text-white">{profileData?.last_name}</p>
                      </div>

                      <div className="md:col-span-2 bg-gray-600/50 rounded-xl p-6 border border-gray-500/30">
                        <div className="flex items-center gap-3 mb-3">
                          <FaEnvelope className="text-green-400 text-lg" />
                          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Email Address</span>
                        </div>
                        <p className="text-xl font-medium text-white">{profileData?.email}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-2xl p-8 border border-red-500/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaShieldAlt className="text-red-400" />
                Account Actions
              </h2>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 shadow-lg"
                >
                  <FaSignOutAlt />
                  Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;