import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  FaUser,
  FaUsers,
  FaUserCheck,
  FaCalendarAlt,
  FaChartLine,
  FaChartBar,
  FaHistory
} from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:5000/auth/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalyticsData(response.data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <LoadingSpinner size="large" message="Loading analytics data..." />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-white">No analytics data available</div>
      </div>
    );
  }

  const { user_analytics, global_analytics } = analyticsData;

  // Prepare login trends data for chart
  const loginTrendsData = {
    labels: Object.keys(global_analytics.login_trends || {}).slice(-7), // Last 7 days
    datasets: [
      {
        label: 'Daily Logins',
        data: Object.values(global_analytics.login_trends || {}).slice(-7),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  // User activity data
  const userActivityData = {
    labels: ['Your Logins', 'Total Users', 'Active Users'],
    datasets: [
      {
        label: 'Count',
        data: [
          user_analytics.login_count || 0,
          global_analytics.total_users || 0,
          global_analytics.active_users || 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 205, 86, 0.6)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Login history chart
  const loginHistory = user_analytics.login_history || [];
  const recentLogins = loginHistory.slice(-10).reverse(); // Last 10 logins

  const loginHistoryData = {
    labels: recentLogins.map((login, index) => `Login ${recentLogins.length - index}`),
    datasets: [
      {
        label: 'Login Activity',
        data: recentLogins.map(() => 1), // Each login counts as 1
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Comprehensive insights into your eyeview.ai system performance</p>
        </motion.div>

        {/* User Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FaUser className="text-blue-400 text-xl" />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Your Total Logins</p>
                <p className="text-3xl font-bold text-white mt-2">{user_analytics.login_count || 0}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <FaUsers className="text-green-400 text-xl" />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Total Users</p>
                <p className="text-3xl font-bold text-white mt-2">{global_analytics.total_users || 0}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-xl">
                  <FaUserCheck className="text-yellow-400 text-xl" />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Active Users</p>
                <p className="text-3xl font-bold text-white mt-2">{global_analytics.active_users || 0}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <FaCalendarAlt className="text-purple-400 text-xl" />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Last Login</p>
                <p className="text-lg font-bold text-white mt-2">
                  {user_analytics.last_login
                    ? new Date(user_analytics.last_login).toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Login Trends Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 shadow-2xl border border-gray-600"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <FaChartLine className="text-blue-400 text-xl" />
              </div>
              <h2 className="text-2xl font-bold">Login Trends (Last 7 Days)</h2>
            </div>
            <Line
              data={loginTrendsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: 'white',
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                  },
                  x: {
                    ticks: {
                      color: 'white',
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                  },
                },
              }}
            />
          </motion.div>

          {/* User Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 shadow-2xl border border-gray-600"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <FaChartBar className="text-green-400 text-xl" />
              </div>
              <h2 className="text-2xl font-bold">User Activity Overview</h2>
            </div>
            <Bar
              data={userActivityData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: 'white',
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                  },
                  x: {
                    ticks: {
                      color: 'white',
                    },
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)',
                    },
                  },
                },
              }}
            />
          </motion.div>
        </div>

        {/* Recent Login Activity */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Recent Login Activity</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 px-4">Date & Time</th>
                  <th className="text-left py-2 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {recentLogins.length > 0 ? (
                  recentLogins.map((login, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="py-2 px-4">
                        {new Date(login.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2 px-4">{login.ip || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-4 px-4 text-center text-gray-400">
                      No login history available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Login History Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Login History Visualization</h2>
          <Bar
            data={loginHistoryData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: 'white',
                    stepSize: 1,
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
                x: {
                  ticks: {
                    color: 'white',
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;