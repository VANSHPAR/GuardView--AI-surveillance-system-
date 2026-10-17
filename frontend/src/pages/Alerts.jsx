import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaClock,
  FaSync,
  FaPlay,
  FaVideo,
  FaBell,
  FaFilter,
  FaSearch,
  FaTimes,
  FaDownload,
  FaCheckCircle,
  FaFileExport,
  FaShieldAlt
} from "react-icons/fa";
import { surveillanceAPI } from '../services/api';
import { toast } from 'react-hot-toast';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [videoErrors, setVideoErrors] = useState(new Set());
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState(() => {
    const saved = localStorage.getItem('guardview_ack_alerts');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await surveillanceAPI.getAlerts();
      const rawAlerts = response.data?.alerts || [];
      const sortedAlerts = rawAlerts.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setAlerts(sortedAlerts);
    } catch (err) {
      console.error("Error fetching alerts:", err);
      toast.error("Failed to fetch recent security alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (timestamp) => {
    const updated = [...acknowledgedAlerts, timestamp];
    setAcknowledgedAlerts(updated);
    localStorage.setItem('guardview_ack_alerts', JSON.stringify(updated));
    toast.success('Incident marked as resolved/acknowledged');
    if (selectedAlert?.timestamp === timestamp) {
      setSelectedAlert(null);
    }
  };

  const exportAlertsCSV = () => {
    if (alerts.length === 0) {
      toast.error("No alerts available to export");
      return;
    }
    const headers = ["Timestamp", "Alert Type", "Confidence", "Location", "Video URL", "Status"];
    const rows = alerts.map(a => [
      `"${a.timestamp}"`,
      `"${a.alerttype}"`,
      `"${(a.confidence * 100).toFixed(1)}%"`,
      `"${a.location}"`,
      `"${a.video_url || 'N/A'}"`,
      acknowledgedAlerts.includes(a.timestamp) ? '"Resolved"' : '"Unresolved"'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `guardview_alerts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Security alerts exported to CSV");
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSearch =
        (alert.alerttype || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alert.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alert.timestamp || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        filterType === 'ALL' ||
        (filterType === 'VIOLENCE' && (alert.alerttype || '').toLowerCase().includes('violence')) ||
        (filterType === 'ACCIDENT' && (alert.alerttype || '').toLowerCase().includes('accident')) ||
        (filterType === 'SHOPLIFTING' && (alert.alerttype || '').toLowerCase().includes('shoplifting'));

      return matchesSearch && matchesType;
    });
  }, [alerts, searchTerm, filterType]);

  const getAlertColor = (alerttype = '') => {
    const lower = alerttype.toLowerCase();
    if (lower.includes('violence')) return { border: 'border-red-500/40', badge: 'bg-red-500/20 text-red-400', icon: 'text-red-400' };
    if (lower.includes('accident')) return { border: 'border-orange-500/40', badge: 'bg-orange-500/20 text-orange-400', icon: 'text-orange-400' };
    return { border: 'border-yellow-500/40', badge: 'bg-yellow-500/20 text-yellow-400', icon: 'text-yellow-400' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
              Security Incidents & Alerts
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Real-time threat detection, AI incident classification and automated dispatch
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportAlertsCSV}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700 transition-all flex items-center gap-2"
            >
              <FaFileExport />
              Export CSV
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchAlerts}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 shadow-lg disabled:opacity-50"
              disabled={loading}
            >
              <FaSync className={loading ? "animate-spin" : ""} />
              {loading ? "Refreshing..." : "Refresh"}
            </motion.button>
          </div>
        </motion.div>

        {/* Filters and Search Bar */}
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-80 bg-gray-900/80 px-4 py-2 rounded-xl border border-gray-700">
            <FaSearch className="text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by incident, location, or time..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <FaFilter className="text-gray-400 text-xs mr-1 hidden sm:inline" />
            {[
              { id: 'ALL', label: 'All Events' },
              { id: 'VIOLENCE', label: 'Violence' },
              { id: 'ACCIDENT', label: 'Accidents' },
              { id: 'SHOPLIFTING', label: 'Shoplifting' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterType(btn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterType === btn.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                    : 'bg-gray-700/60 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Cards or Empty State */}
        {loading && alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 text-lg">Loading security incidents...</p>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/40 rounded-2xl border border-gray-700">
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <FaBell className="text-gray-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No Alerts Found</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              {searchTerm || filterType !== 'ALL'
                ? "No incidents matched your search or category filter. Try clearing filters."
                : "All clear! The AI surveillance system has not detected any security anomalies."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlerts.map((alert, index) => {
              const readableTime = new Date(alert.timestamp).toLocaleString();
              const colors = getAlertColor(alert.alerttype);
              const isResolved = acknowledgedAlerts.includes(alert.timestamp);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                  className={`bg-gradient-to-br from-gray-800 to-gray-700/90 rounded-2xl p-6 shadow-xl border ${
                    isResolved ? 'border-gray-700 opacity-75' : colors.border
                  } hover:scale-[1.01] transition-all flex flex-col justify-between`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${colors.badge}`}>
                          <FaExclamationTriangle className={`text-xl ${colors.icon}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white leading-snug">
                            {alert.alerttype}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                isResolved
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-green-500/20 text-green-400 animate-pulse'
                              }`}
                            >
                              {isResolved ? "Resolved" : "Active Alert"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2.5 mb-5 text-sm text-gray-300">
                      <div className="flex items-center gap-2.5">
                        <FaClock className="text-blue-400 text-xs flex-shrink-0" />
                        <span className="text-xs">{readableTime}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <FaMapMarkerAlt className="text-green-400 text-xs flex-shrink-0" />
                        <span className="text-xs truncate">{alert.location || "Vadodara, Gujarat"}</span>
                      </div>

                      {alert.confidence != null && (
                        <div>
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="text-gray-400 font-medium">Confidence Score</span>
                            <span className="font-bold text-yellow-400">
                              {(Number(alert.confidence) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-yellow-400 to-red-500 h-full rounded-full"
                              style={{ width: `${Math.min(Number(alert.confidence) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-gray-700/60 flex gap-2">
                    <button
                      onClick={() => setSelectedAlert(alert)}
                      className="flex-1 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white py-2.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <FaVideo />
                      View Incident Clip
                    </button>
                    {!isResolved && (
                      <button
                        onClick={() => handleAcknowledge(alert.timestamp)}
                        title="Mark as Resolved"
                        className="p-2.5 bg-gray-700 hover:bg-gray-600 text-green-400 rounded-xl transition-colors"
                      >
                        <FaCheckCircle />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Incident Detail Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAlert(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
              >
                <FaTimes size={18} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/20 rounded-xl">
                  <FaExclamationTriangle className="text-red-400 text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedAlert.alerttype}</h2>
                  <p className="text-xs text-gray-400">Incident Details & Evidence Verification</p>
                </div>
              </div>

              {/* Video Player */}
              <div className="mb-6 rounded-2xl overflow-hidden bg-black border border-gray-700 shadow-inner">
                {selectedAlert.video_url && !videoErrors.has(selectedAlert.video_url) ? (
                  <video
                    controls
                    autoPlay
                    src={selectedAlert.video_url}
                    className="w-full max-h-72 object-contain bg-black"
                    onError={() => {
                      setVideoErrors((prev) => new Set([...prev, selectedAlert.video_url]));
                    }}
                  >
                    Your browser does not support HTML5 video tag.
                  </video>
                ) : (
                  <div className="p-8 text-center bg-gray-800/80">
                    <FaVideo className="text-red-400 text-4xl mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-300">Video Evidence Unavailable</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Clip buffer is processing or stored locally on surveillance node.
                    </p>
                  </div>
                )}
              </div>

              {/* Incident Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="p-3 bg-gray-800/60 rounded-xl border border-gray-700">
                  <p className="text-xs text-gray-400">Date & Time</p>
                  <p className="font-semibold text-white mt-1">
                    {new Date(selectedAlert.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-gray-800/60 rounded-xl border border-gray-700">
                  <p className="text-xs text-gray-400">Confidence Metric</p>
                  <p className="font-semibold text-yellow-400 mt-1">
                    {(Number(selectedAlert.confidence) * 100).toFixed(1)}% Match
                  </p>
                </div>
                <div className="p-3 bg-gray-800/60 rounded-xl border border-gray-700">
                  <p className="text-xs text-gray-400">Location Tag</p>
                  <p className="font-semibold text-white mt-1 truncate">
                    {selectedAlert.location || "Vadodara, Gujarat"}
                  </p>
                </div>
                <div className="p-3 bg-gray-800/60 rounded-xl border border-gray-700">
                  <p className="text-xs text-gray-400">Email Alert Notification</p>
                  <p className="font-semibold text-green-400 mt-1 flex items-center gap-1.5">
                    <FaCheckCircle className="text-xs" /> Dispatched to Mail
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {selectedAlert.video_url && (
                  <a
                    href={selectedAlert.video_url}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <FaDownload />
                    Download Evidence Clip
                  </a>
                )}
                {!acknowledgedAlerts.includes(selectedAlert.timestamp) && (
                  <button
                    onClick={() => handleAcknowledge(selectedAlert.timestamp)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle />
                    Mark Resolved
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Alerts;
