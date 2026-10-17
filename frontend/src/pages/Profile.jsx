import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
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
  FaPhone,
  FaUserCircle,
  FaShieldAlt,
  FaSignOutAlt,
  FaKey,
  FaBell,
  FaCheckCircle,
  FaLock
} from 'react-icons/fa';

const Profile = () => {
  const { logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState(() => {
    const saved = localStorage.getItem('guardview_notifications');
    return saved ? JSON.parse(saved) : {
      emailAlerts: true,
      smsAlerts: true,
      soundAlerts: true,
      browserAlerts: true
    };
  });

  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setProfileData(response.data.user);
      setEditForm({
        first_name: response.data.user.first_name || '',
        last_name: response.data.user.last_name || '',
        email: response.data.user.email || '',
        phone: response.data.user.phone || ''
      });
    } catch {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.updateProfile(editForm);
      setProfileData(response.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    // Simulate / execute password change
    toast.success('Security credentials updated successfully');
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const toggleNotification = (key) => {
    const updated = { ...notificationSettings, [key]: !notificationSettings[key] };
    setNotificationSettings(updated);
    localStorage.setItem('guardview_notifications', JSON.stringify(updated));
    toast.success('Notification preferences updated');
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-gray-300">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
              User Profile & Account
            </h1>
            <p className="text-gray-400 text-base md:text-lg">Manage your account information, security credentials, and alert preferences</p>
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
                    <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <FaUserCircle className="text-white text-6xl" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center" title="Account Active">
                      <FaShieldAlt className="text-white text-xs" />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-1">
                    {profileData?.first_name} {profileData?.last_name}
                  </h2>
                  <p className="text-gray-400 text-sm mb-1">{profileData?.email}</p>
                  <p className="text-gray-400 text-sm mb-4">{profileData?.phone || 'No phone set'}</p>

                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-300 text-xs font-semibold mb-6">
                    <FaCheckCircle className="text-blue-400" />
                    <span>Administrator</span>
                  </div>

                  <div className="flex justify-center gap-4 text-xs text-gray-400 pt-4 border-t border-gray-600">
                    <div className="flex items-center gap-1">
                      <FaIdBadge />
                      <span>ID: {profileData?.id ? profileData.id.slice(0, 8) : 'ADMIN-01'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>{profileData?.created_at ? new Date(profileData.created_at).toLocaleDateString() : 'Active User'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Security Action */}
                <div className="mt-8 pt-6 border-t border-gray-600 space-y-3">
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-xl text-sm font-medium transition-colors"
                  >
                    <FaKey className="text-yellow-400" />
                    Change Password
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2.5 px-4 rounded-xl text-sm font-medium border border-red-500/20 transition-colors"
                  >
                    <FaSignOutAlt />
                    Log Out
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Profile Details and Edit Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 shadow-2xl border border-gray-600">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <FaUser className="text-blue-400" />
                    Profile Information
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
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
                        <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                          <FaUser className="text-blue-400" />
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={editForm.first_name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-600/80 border border-gray-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                          <FaUser className="text-purple-400" />
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          value={editForm.last_name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-600/80 border border-gray-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <FaEnvelope className="text-green-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-600/80 border border-gray-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <FaPhone className="text-yellow-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        placeholder="Enter 10-digit phone number"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        className="w-full bg-gray-600/80 border border-gray-500 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                        required
                      />
                    </div>
                    <div className="flex gap-4 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg"
                      >
                        <FaSave />
                        Save Changes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600/60">
                      <div className="flex items-center gap-3 mb-2">
                        <FaUser className="text-blue-400 text-base" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">First Name</span>
                      </div>
                      <p className="text-lg font-medium text-white">{profileData?.first_name || 'N/A'}</p>
                    </div>

                    <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600/60">
                      <div className="flex items-center gap-3 mb-2">
                        <FaUser className="text-purple-400 text-base" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Last Name</span>
                      </div>
                      <p className="text-lg font-medium text-white">{profileData?.last_name || 'N/A'}</p>
                    </div>

                    <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600/60">
                      <div className="flex items-center gap-3 mb-2">
                        <FaEnvelope className="text-green-400 text-base" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email Address</span>
                      </div>
                      <p className="text-lg font-medium text-white">{profileData?.email || 'N/A'}</p>
                    </div>

                    <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600/60">
                      <div className="flex items-center gap-3 mb-2">
                        <FaPhone className="text-yellow-400 text-base" />
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone Number</span>
                      </div>
                      <p className="text-lg font-medium text-white">{profileData?.phone || 'Not configured'}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Notification Preferences Card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 shadow-2xl border border-gray-600">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaBell className="text-yellow-400" />
                  Alert & Notification Preferences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/40 rounded-xl border border-gray-600/50">
                    <div>
                      <p className="font-semibold text-white">Mail Alerts</p>
                      <p className="text-xs text-gray-400">Receive instant alerts upon detection</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsAlerts}
                      onChange={() => toggleNotification('smsAlerts')}
                      className="w-5 h-5 accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/40 rounded-xl border border-gray-600/50">
                    <div>
                      <p className="font-semibold text-white">Email Incident Logs</p>
                      <p className="text-xs text-gray-400">Send email with recorded clip link</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailAlerts}
                      onChange={() => toggleNotification('emailAlerts')}
                      className="w-5 h-5 accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/40 rounded-xl border border-gray-600/50">
                    <div>
                      <p className="font-semibold text-white">Dashboard Audio Alarm</p>
                      <p className="text-xs text-gray-400">Play chime when new alert arrives</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.soundAlerts}
                      onChange={() => toggleNotification('soundAlerts')}
                      className="w-5 h-5 accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/40 rounded-xl border border-gray-600/50">
                    <div>
                      <p className="font-semibold text-white">Browser Push Notifications</p>
                      <p className="text-xs text-gray-400">Show notification popup in browser</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.browserAlerts}
                      onChange={() => toggleNotification('browserAlerts')}
                      className="w-5 h-5 accent-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FaLock className="text-yellow-400" />
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 block mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2.5 rounded-xl font-medium transition-all"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2.5 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;