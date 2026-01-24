import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaEye,
  FaBell,
  FaVideo,
  FaClock,
  FaShieldAlt,
  FaExclamationTriangle
} from "react-icons/fa";
import axios from "axios";

const videos = [
  {
    id: 1,
    title: "Live Detection - Camera 1",
    src: "http://127.0.0.1:5000/video_feed",
  },
];

const Dashboard = () => {
  const [pausedStates, setPausedStates] = useState({});
  const [fullscreenStates, setFullscreenStates] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({
    totalAlerts: 0,
    activeCameras: 1,
    uptime: "24h 30m",
    detectionAccuracy: 94.2
  });
  const videoRefs = useRef({});

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/alerts');
      setAlerts(response.data.alerts.slice(0, 5)); // Show last 5 alerts
      setStats(prev => ({ ...prev, totalAlerts: response.data.alerts.length }));
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    }
  };

  const togglePause = (id, src) => {
    const isPaused = pausedStates[id] || false;
    const updatedPaused = { ...pausedStates, [id]: !isPaused };

    if (videoRefs.current[id]) {
      videoRefs.current[id].src = isPaused ? src : ""; // Reset or clear stream
    }

    setPausedStates(updatedPaused);
  };

  const toggleFullscreen = (id) => {
    const isFullscreen = fullscreenStates[id] || false;
    const updatedFullscreen = { ...fullscreenStates, [id]: !isFullscreen };

    const el = videoRefs.current[id];
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch((err) => console.error("Fullscreen error:", err));
    } else {
      document.exitFullscreen();
    }

    setFullscreenStates(updatedFullscreen);
  };

  const statsCards = [
    {
      icon: <FaBell className="text-yellow-400" />,
      title: "Total Alerts",
      value: stats.totalAlerts,
      bgColor: "bg-yellow-500/10 border-yellow-500/20"
    },
    {
      icon: <FaVideo className="text-blue-400" />,
      title: "Active Cameras",
      value: stats.activeCameras,
      bgColor: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: <FaClock className="text-green-400" />,
      title: "System Uptime",
      value: stats.uptime,
      bgColor: "bg-green-500/10 border-green-500/20"
    },
    {
      icon: <FaShieldAlt className="text-purple-400" />,
      title: "Detection Accuracy",
      value: `${stats.detectionAccuracy}%`,
      bgColor: "bg-purple-500/10 border-purple-500/20"
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white w-full p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Live Detection Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">AI-Powered Surveillance System</p>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">System Active</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-6 rounded-xl border ${card.bgColor} hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                  <p className="text-2xl font-bold mt-1">{card.value}</p>
                </div>
                <div className="text-2xl">
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Video Stream */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FaEye className="text-blue-400" />
                Live Camera Feed
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700"
                  >
                    <div className="relative">
                      <img
                        ref={(el) => (videoRefs.current[video.id] = el)}
                        src={video.src}
                        alt="Live Stream"
                        className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => toggleFullscreen(video.id)}
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePause(video.id, video.src);
                          }}
                        >
                          {pausedStates[video.id] ? <FaPlay size={16} /> : <FaPause size={16} />}
                        </button>
                        <button
                          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFullscreen(video.id);
                          }}
                        >
                          {fullscreenStates[video.id] ? <FaCompress size={16} /> : <FaExpand size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-200">{video.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-400">Live</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Alerts Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FaExclamationTriangle className="text-red-400" />
                Recent Alerts
              </h2>

              <div className="space-y-4">
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-gray-800 p-4 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-200">Violence Detected</p>
                          <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                          <p className="text-xs text-gray-500">Confidence: {alert.confidence}%</p>
                          <p className="text-xs text-gray-500">{alert.location}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-gray-800 p-8 rounded-lg text-center border border-gray-700">
                    <FaBell className="text-gray-600 text-3xl mx-auto mb-2" />
                    <p className="text-gray-400">No recent alerts</p>
                    <p className="text-sm text-gray-500 mt-1">System is monitoring</p>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchAlerts}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
              >
                Refresh Alerts
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
