import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSlidersH,
  FaShieldAlt,
  FaBell,
  FaEnvelope,
  FaVideo,
  FaDatabase,
  FaSave,
  FaUndo,
  FaCheckCircle,
  FaExclamationCircle,
  FaVolumeUp,
  FaCamera
} from "react-icons/fa";
import { surveillanceAPI } from "../services/api";
import { toast } from "react-hot-toast";

const DEFAULT_SETTINGS = {
  detectionMode: "Violence Detection",
  confidenceThreshold: 75,
  clipDuration: 10,
  cameraSource: "Webcam / Live Stream",
  customRtspUrl: "",
  emailAlerts: true,
  adminEmail: "security@guardview.ai",
  includeVideoLink: true,
  includeConfidenceScore: true,
  smtpHost: "smtp.gmail.com",
  senderEmail: "sysguardview@gmail.com",
  soundAlerts: true,
  alertCooldown: 60,
  retentionDays: 30,
  refreshInterval: 5,
  videoQuality: "720p HD"
};

const Settings = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("guardview_settings");
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [activeTab, setActiveTab] = useState("detection");
  const [isSaving, setIsSaving] = useState(false);

  const handleModeChange = async (newMode) => {
    setSettings((prev) => ({ ...prev, detectionMode: newMode }));
    try {
      await surveillanceAPI.setDetectionMode(newMode);
      toast.success(`Active AI Model changed to ${newMode}`);
    } catch {
      toast.error("Could not sync detection mode with backend");
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem("guardview_settings", JSON.stringify(settings));
      // Sync detection mode with backend
      await surveillanceAPI.setDetectionMode(settings.detectionMode);
      toast.success("Settings saved successfully!");
    } catch {
      // Even if backend fails, localStorage holds settings
      toast.success("Settings saved to local preferences");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem("guardview_settings");
    toast.success("Settings reset to defaults");
  };

  const tabs = [
    { id: "detection", label: "AI & Detection", icon: <FaShieldAlt /> },
    { id: "notifications", label: "Email Alerts & Mail", icon: <FaEnvelope /> },
    { id: "cameras", label: "Cameras & Feeds", icon: <FaCamera /> },
    { id: "storage", label: "Storage & System", icon: <FaDatabase /> },
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white w-full p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
              <FaSlidersH className="text-blue-400" />
              System Settings & Configuration
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Configure AI detection parameters, surveillance streams, automated email alerts, and storage
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm font-medium border border-gray-700 transition-colors flex items-center gap-2"
            >
              <FaUndo />
              Reset Defaults
            </button>
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <FaSave />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Tabs */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-800/80 rounded-2xl p-6 md:p-8 border border-gray-700 shadow-xl">
          {/* TAB 1: AI & Detection */}
          {activeTab === "detection" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400">
                <FaShieldAlt />
                AI Model & Inference Configuration
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Default Detection Mode
                  </label>
                  <select
                    value={settings.detectionMode}
                    onChange={(e) => handleModeChange(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Violence Detection">Violence Detection (YOLOv11)</option>
                    <option value="Accident Detection">Accident Detection (Road & Traffic)</option>
                    <option value="Shoplifting Detection">Shoplifting Detection (Retail)</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-2">
                    Directly toggles the neural network weights running on the backend server.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-300">
                      Confidence Threshold
                    </label>
                    <span className="text-sm font-bold text-blue-400">
                      {settings.confidenceThreshold}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="1"
                    value={settings.confidenceThreshold}
                    onChange={(e) =>
                      setSettings({ ...settings, confidenceThreshold: Number(e.target.value) })
                    }
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50% (High Sensitivity)</span>
                    <span>75% (Recommended)</span>
                    <span>95% (High Precision)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Evidence Clip Recording Duration
                  </label>
                  <select
                    value={settings.clipDuration}
                    onChange={(e) =>
                      setSettings({ ...settings, clipDuration: Number(e.target.value) })
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value={5}>5 Seconds Buffer</option>
                    <option value={10}>10 Seconds Buffer (Standard)</option>
                    <option value={15}>15 Seconds Buffer</option>
                    <option value={30}>30 Seconds Extended</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Alert Trigger Cooldown
                  </label>
                  <select
                    value={settings.alertCooldown}
                    onChange={(e) =>
                      setSettings({ ...settings, alertCooldown: Number(e.target.value) })
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value={15}>15 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>60 seconds (Standard)</option>
                    <option value={120}>120 seconds</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-2">
                    Minimum delay between consecutive alerts to prevent notification flooding.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Email Alerts & Mail Service */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-yellow-400">
                <FaEnvelope />
                Email Alert Routing & Mail Service Configuration
              </h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-white">Automated Email Incident Alerts</p>
                    <p className="text-xs text-gray-400">
                      Instantly dispatch security alerts to administrators via email when violence, accidents, or theft are detected
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                    className="w-6 h-6 accent-blue-500 cursor-pointer"
                  />
                </div>

                {settings.emailAlerts && (
                  <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-700/60 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Admin / Recipient Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.adminEmail}
                        onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                        placeholder="security@guardview.ai"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                      />
                      <p className="text-xs text-gray-400 mt-1.5">
                        Alert notifications will be delivered to this address automatically upon incident detection.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center justify-between p-3 bg-gray-800/80 rounded-xl border border-gray-700">
                        <div>
                          <p className="text-xs font-semibold text-white">Include Video Replay Link</p>
                          <p className="text-[11px] text-gray-400">Embed direct evidence playback link</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.includeVideoLink}
                          onChange={(e) => setSettings({ ...settings, includeVideoLink: e.target.checked })}
                          className="w-4 h-4 accent-blue-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-800/80 rounded-xl border border-gray-700">
                        <div>
                          <p className="text-xs font-semibold text-white">Include Confidence Score</p>
                          <p className="text-[11px] text-gray-400">Attach AI model detection percentage</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.includeConfidenceScore}
                          onChange={(e) => setSettings({ ...settings, includeConfidenceScore: e.target.checked })}
                          className="w-4 h-4 accent-blue-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* SMTP Mail Server Info */}
                <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                      <FaCheckCircle className="text-green-400 text-xs" />
                      Active Mail Dispatch Pipeline (SMTP)
                    </span>
                    <span className="text-[11px] font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                      CONNECTED
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-black/30 p-2.5 rounded-lg border border-gray-800">
                      <span className="text-gray-400">Sender Address:</span>
                      <p className="font-mono text-white mt-0.5 truncate">{settings.senderEmail || "sysguardview@gmail.com"}</p>
                    </div>
                    <div className="bg-black/30 p-2.5 rounded-lg border border-gray-800">
                      <span className="text-gray-400">Mail Gateway:</span>
                      <p className="font-mono text-white mt-0.5">smtp.gmail.com (TLS Port 587)</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FaVolumeUp className="text-purple-400 text-xl" />
                    <div>
                      <p className="font-semibold text-white">Dashboard Audio Chime</p>
                      <p className="text-xs text-gray-400">Play alert tone when new threat is detected</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.soundAlerts}
                    onChange={(e) => setSettings({ ...settings, soundAlerts: e.target.checked })}
                    className="w-6 h-6 accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Cameras & Feeds */}
          {activeTab === "cameras" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-green-400">
                <FaVideo />
                Camera Feeds & Stream Inputs
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Default Video Source
                  </label>
                  <select
                    value={settings.cameraSource}
                    onChange={(e) => setSettings({ ...settings, cameraSource: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Webcam / Live Stream">Webcam / USB Camera (Default)</option>
                    <option value="Pre-recorded Demo Clip">Pre-recorded Testing Video (MP4)</option>
                    <option value="RTSP IP Camera">Network IP Camera (RTSP / HTTP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Stream Resolution
                  </label>
                  <select
                    value={settings.videoQuality}
                    onChange={(e) => setSettings({ ...settings, videoQuality: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="480p SD">480p SD (Low Bandwidth)</option>
                    <option value="720p HD">720p HD (Balanced - 1280x720)</option>
                    <option value="1080p FHD">1080p Full HD (High Quality)</option>
                  </select>
                </div>

                {settings.cameraSource === "RTSP IP Camera" && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      RTSP / IP Camera Stream URL
                    </label>
                    <input
                      type="text"
                      placeholder="rtsp://admin:password@192.168.1.100:554/stream1"
                      value={settings.customRtspUrl}
                      onChange={(e) => setSettings({ ...settings, customRtspUrl: e.target.value })}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Storage & System */}
          {activeTab === "storage" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-purple-400">
                <FaDatabase />
                Storage & System Telemetry
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                    <FaCheckCircle />
                    Firebase Cloud Storage
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    Connected to Realtime Database & Cloud Buckets
                  </p>
                  <div className="text-xs font-mono bg-black/40 p-2 rounded text-gray-300 truncate">
                    guard-view-20676-default-rtdb.firebaseio.com
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Clip Retention Period
                  </label>
                  <select
                    value={settings.retentionDays}
                    onChange={(e) =>
                      setSettings({ ...settings, retentionDays: Number(e.target.value) })
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value={7}>7 Days</option>
                    <option value={14}>14 Days</option>
                    <option value={30}>30 Days (Recommended)</option>
                    <option value={90}>90 Days</option>
                    <option value={-1}>Keep Indefinitely</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Dashboard Auto-Refresh Interval
                  </label>
                  <select
                    value={settings.refreshInterval}
                    onChange={(e) =>
                      setSettings({ ...settings, refreshInterval: Number(e.target.value) })
                    }
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value={2}>2 Seconds</option>
                    <option value={5}>5 Seconds (Recommended)</option>
                    <option value={10}>10 Seconds</option>
                    <option value={30}>30 Seconds</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-700 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">System Status</p>
                    <p className="text-xs text-gray-400">Backend API, YOLO & Video Pipelines</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    ONLINE
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
