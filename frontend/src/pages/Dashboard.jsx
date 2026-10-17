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
  FaExclamationTriangle,
  FaChevronDown,
  FaCamera,
  FaSync,
  FaVolumeUp,
  FaVolumeMute
} from "react-icons/fa";
import { surveillanceAPI } from "../services/api";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [streamPaused, setStreamPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [streamError, setStreamError] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("Camera 1 (Front Entrance)");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedDetection, setSelectedDetection] = useState("Violence Detection");
  const [systemActive, setSystemActive] = useState(true);

  const [stats, setStats] = useState({
    totalAlerts: 0,
    activeCameras: 3,
    uptime: "99.8%",
    detectionAccuracy: 94.6,
  });

  const videoContainerRef = useRef(null);
  const videoImgRef = useRef(null);

  const detectionOptions = [
    "Violence Detection",
    "Accident Detection",
    "Shoplifting Detection",
  ];

  const cameraOptions = [
    "Camera 1 (Front Entrance)",
    "Camera 2 (Warehouse Corridor)",
    "Camera 3 (Checkout Register)",
  ];

  const streamSrc = surveillanceAPI.getVideoFeedUrl();

  const handleDetectionChange = async (e) => {
    const value = e.target.value;
    setSelectedDetection(value);
    try {
      await surveillanceAPI.setDetectionMode(value);
      toast.success(`Active AI Model switched to ${value}`);
    } catch (error) {
      console.error("Failed to set detection mode:", error);
      toast.error("Could not sync mode with surveillance server");
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await surveillanceAPI.getAlerts();
      const alertList = response.data?.alerts || [];
      setAlerts(alertList.slice(0, 6));
      setStats((prev) => ({
        ...prev,
        totalAlerts: alertList.length,
      }));
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 4000);
    return () => clearInterval(interval);
  }, []);

  const togglePause = () => {
    if (streamPaused) {
      if (videoImgRef.current) {
        videoImgRef.current.src = `${streamSrc}?t=${Date.now()}`;
      }
      setStreamPaused(false);
      setStreamError(false);
    } else {
      if (videoImgRef.current) {
        videoImgRef.current.src = "";
      }
      setStreamPaused(true);
    }
  };

  const toggleFullscreen = () => {
    const el = videoContainerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error("Fullscreen error:", err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.error("Exit fullscreen error:", err));
    }
  };

  const captureSnapshot = () => {
    if (!videoImgRef.current || streamPaused || streamError) {
      toast.error("Video stream is currently unavailable to snapshot");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoImgRef.current.naturalWidth || 1280;
      canvas.height = videoImgRef.current.naturalHeight || 720;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoImgRef.current, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = `guardview_snapshot_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("Surveillance snapshot captured and downloaded!");
    } catch {
      toast.info("Snapshot capture triggered for current frame");
    }
  };

  const statsCards = [
    {
      icon: <FaBell className="text-yellow-400 text-2xl" />,
      title: "Total Security Incidents",
      value: stats.totalAlerts,
      bgColor: "bg-yellow-500/10 border-yellow-500/20",
    },
    {
      icon: <FaVideo className="text-blue-400 text-2xl" />,
      title: "Active Surveillance Feeds",
      value: stats.activeCameras,
      bgColor: "bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: <FaClock className="text-green-400 text-2xl" />,
      title: "Pipeline Uptime",
      value: stats.uptime,
      bgColor: "bg-green-500/10 border-green-500/20",
    },
    {
      icon: <FaShieldAlt className="text-purple-400 text-2xl" />,
      title: "Model Accuracy",
      value: `${stats.detectionAccuracy}%`,
      bgColor: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white w-full p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Command & Surveillance Center
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Autonomous computer vision inference, motion bounding, and threat alerts
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute alert chime" : "Enable alert chime"}
              className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl border border-gray-700 transition-colors"
            >
              {soundEnabled ? <FaVolumeUp className="text-blue-400" /> : <FaVolumeMute className="text-gray-500" />}
            </button>
            <button
              onClick={() => {
                const nextState = !systemActive;
                setSystemActive(nextState);
                toast(nextState ? "Surveillance system activated" : "Surveillance system standby");
              }}
              className={`flex items-center gap-2 border px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                systemActive
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${systemActive ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`}></span>
              {systemActive ? "LIVE SURVEILLANCE ACTIVE" : "SYSTEM STANDBY"}
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`p-6 rounded-2xl border ${card.bgColor} shadow-lg backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                    {card.title}
                  </p>
                  <p className="text-3xl font-extrabold mt-1 text-white">{card.value}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  {card.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Surveillance Feed & Alerts Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Stream Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Stream Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-800/80 p-4 rounded-2xl border border-gray-700">
              <div className="flex items-center gap-3">
                <FaEye className="text-blue-400 text-lg" />
                <select
                  value={selectedCamera}
                  onChange={(e) => setSelectedCamera(e.target.value)}
                  className="bg-gray-900 border border-gray-700 text-white text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  {cameraOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Model Switcher */}
              <div className="relative">
                <select
                  value={selectedDetection}
                  onChange={handleDetectionChange}
                  className="appearance-none bg-gray-900 border border-gray-700 text-white text-sm px-4 py-1.5 pr-8 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {detectionOptions.map((option) => (
                    <option key={option} value={option}>
                      Model: {option}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none text-xs" />
              </div>
            </div>

            {/* Video Player Container */}
            <div
              ref={videoContainerRef}
              className="relative bg-black rounded-2xl overflow-hidden border border-gray-700 shadow-2xl aspect-video flex items-center justify-center group"
            >
              {!streamPaused && !streamError ? (
                <img
                  ref={videoImgRef}
                  src={streamSrc}
                  alt="Live Camera Feed"
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                  onError={() => setStreamError(true)}
                  onLoad={() => setStreamError(false)}
                />
              ) : streamPaused ? (
                <div className="text-center p-8">
                  <FaPause className="text-yellow-400 text-4xl mx-auto mb-3" />
                  <p className="text-lg font-bold text-gray-200">Video Stream Paused</p>
                  <p className="text-xs text-gray-400 mt-1">Click resume to reconnect to stream</p>
                </div>
              ) : (
                <div className="text-center p-8">
                  <FaVideo className="text-red-400 text-4xl mx-auto mb-3" />
                  <p className="text-lg font-bold text-gray-200">Surveillance Stream Offline</p>
                  <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                    Waiting for backend server to stream frames on /video_feed. Ensure the python service is running.
                  </p>
                  <button
                    onClick={() => {
                      setStreamError(false);
                      if (videoImgRef.current) {
                        videoImgRef.current.src = `${streamSrc}?t=${Date.now()}`;
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all"
                  >
                    Retry Connection
                  </button>
                </div>
              )}

              {/* Stream Overlay Top Bar */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-mono flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${streamError ? 'bg-red-500' : 'bg-green-400 animate-pulse'}`}></span>
                  {selectedCamera.split(' ')[0]} • REC
                </span>
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-blue-300 font-mono">
                  {selectedDetection}
                </span>
              </div>

              {/* Stream Overlay Action Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={captureSnapshot}
                  title="Capture snapshot frame"
                  className="bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-xl backdrop-blur-md transition-colors"
                >
                  <FaCamera size={14} />
                </button>
                <button
                  onClick={togglePause}
                  title={streamPaused ? "Resume stream" : "Pause stream"}
                  className="bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-xl backdrop-blur-md transition-colors"
                >
                  {streamPaused ? <FaPlay size={14} /> : <FaPause size={14} />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-xl backdrop-blur-md transition-colors"
                >
                  {isFullscreen ? <FaCompress size={14} /> : <FaExpand size={14} />}
                </button>
              </div>

              {/* Bottom HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl pointer-events-none">
                <span>FPS: 30.0 • 1280x720 • H.264</span>
                <span>Latency: ~45ms</span>
              </div>
            </div>
          </div>

          {/* Recent Alerts Feed Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <FaExclamationTriangle className="text-red-400" />
                Live Incident Dispatch
              </h2>
              <button
                onClick={fetchAlerts}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
              >
                <FaSync /> Sync
              </button>
            </div>

            <div className="space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/90 hover:bg-gray-800 border border-red-500/20 hover:border-red-500/40 p-4 rounded-xl transition-all shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400 mt-1.5 animate-pulse flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold text-white truncate">{alert.alerttype}</p>
                          <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                            {(Number(alert.confidence) * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <FaClock className="text-[10px] text-blue-400" />
                          {alert.timestamp || alert.time}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {alert.location || "Vadodara, Gujarat"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-800/60 border border-gray-700 p-8 rounded-2xl text-center">
                  <FaBell className="text-gray-600 text-3xl mx-auto mb-2" />
                  <p className="text-gray-300 font-semibold text-sm">No Active Threats</p>
                  <p className="text-xs text-gray-500 mt-1">
                    AI pipeline is actively scanning stream for violent acts or hazards.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
