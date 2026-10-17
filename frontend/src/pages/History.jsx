import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHistory,
  FaVideo,
  FaClock,
  FaPlay,
  FaDownload,
  FaEye,
  FaSearch,
  FaTimes,
  FaCalendarAlt,
  FaShieldAlt,
  FaExclamationTriangle
} from "react-icons/fa";
import { surveillanceAPI } from "../services/api";
import { toast } from "react-hot-toast";

const HistorySection = () => {
  const [historyClips, setHistoryClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoErrors, setVideoErrors] = useState(new Set());
  const [selectedClip, setSelectedClip] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHistoryClips = async () => {
    try {
      const response = await surveillanceAPI.getHistoryClips();
      const clipsData = response.data || [];

      const clipsWithUrls = clipsData.map((clip) => ({
        ...clip,
        videoUrl: clip.url?.startsWith("http")
          ? clip.url
          : surveillanceAPI.getClipUrl(clip.filename),
        thumbnailUrl: clip.thumbnail_url?.startsWith("http")
          ? clip.thumbnail_url
          : clip.thumbnail_url
          ? surveillanceAPI.getThumbnailUrl(clip.filename.replace('.mp4', '_thumb.jpg'))
          : null,
      }));

      setHistoryClips(clipsWithUrls);
    } catch (err) {
      console.error("Failed to fetch clips: ", err);
      toast.error("Failed to load recorded video clips");
      setHistoryClips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryClips();
  }, []);

  const filteredClips = useMemo(() => {
    return historyClips.filter((clip) => {
      const filenameMatch = (clip.filename || '').toLowerCase().includes(searchTerm.toLowerCase());
      const timeMatch = (clip.timestamp || '').toLowerCase().includes(searchTerm.toLowerCase());
      return filenameMatch || timeMatch;
    });
  }, [historyClips, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
              Surveillance Archive
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Recorded incident clips, motion captures, and tamper-proof security evidence
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchHistoryClips}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-700 transition-all flex items-center gap-2"
            >
              <FaHistory />
              Refresh Clips
            </button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-96 bg-gray-900/80 px-4 py-2.5 rounded-xl border border-gray-700">
            <FaSearch className="text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by clip name or date..."
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
          <div className="text-xs text-gray-400 font-medium hidden sm:block">
            Total Clips: <span className="text-blue-400 font-bold">{filteredClips.length}</span>
          </div>
        </div>

        {/* Loading / Empty / Clips Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 text-lg">Loading video archive...</p>
          </div>
        ) : filteredClips.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/40 rounded-2xl border border-gray-700">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600">
              <FaVideo className="text-gray-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No Video Clips Found</h3>
            <p className="text-gray-400 max-w-md mx-auto text-sm">
              {searchTerm
                ? "No clips matched your search query."
                : "Security footage will automatically appear here when an incident trigger occurs and records a clip."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClips.map((clip, index) => {
              const readableTime = new Date(clip.timestamp).toLocaleString();
              const isError = videoErrors.has(clip.id);

              return (
                <motion.div
                  key={clip.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-blue-400/50 transition-all flex flex-col justify-between group"
                >
                  {/* Video Thumbnail / Preview Container */}
                  <div
                    onClick={() => !isError && setSelectedClip(clip)}
                    className="relative aspect-video bg-black cursor-pointer overflow-hidden"
                  >
                    {!isError ? (
                      <>
                        <video
                          src={clip.videoUrl}
                          poster={clip.thumbnailUrl}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          preload="metadata"
                          muted
                          onError={() => {
                            setVideoErrors((prev) => new Set([...prev, clip.id]));
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <FaPlay className="ml-1" />
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold text-white uppercase flex items-center gap-1">
                          <FaEye className="text-blue-400" />
                          <span>HD MP4</span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 p-4 text-center">
                        <FaExclamationTriangle className="text-red-400 text-2xl mb-1" />
                        <span className="text-xs text-gray-400 font-medium">Recording Corrupted</span>
                      </div>
                    )}
                  </div>

                  {/* Clip Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <FaClock className="text-blue-400" />
                        <span className="truncate">{readableTime}</span>
                      </div>
                      <h4 className="font-semibold text-white text-sm mb-3 truncate" title={clip.filename}>
                        {clip.filename}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-700/60">
                      <button
                        onClick={() => !isError && setSelectedClip(clip)}
                        disabled={isError}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                          isError
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <FaPlay className="text-[10px]" /> Play
                      </button>

                      <a
                        href={clip.videoUrl}
                        download={clip.filename}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-gray-300 hover:text-white bg-gray-700/80 hover:bg-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <FaDownload className="text-[10px]" /> Download
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Replay Modal */}
      <AnimatePresence>
        {selectedClip && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-700 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FaVideo className="text-green-400" />
                  <h3 className="text-lg font-bold text-white truncate max-w-md">
                    {selectedClip.filename}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedClip(null)}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden bg-black border border-gray-800 aspect-video mb-4 shadow-inner">
                <video
                  src={selectedClip.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 pt-2 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-400" />
                  <span>Recorded on: {new Date(selectedClip.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <a
                    href={selectedClip.videoUrl}
                    download={selectedClip.filename}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2"
                  >
                    <FaDownload />
                    Download MP4
                  </a>
                  <button
                    onClick={() => setSelectedClip(null)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistorySection;
