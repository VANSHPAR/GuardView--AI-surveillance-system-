import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion';
import { FaHistory, FaVideo, FaClock, FaPlay, FaDownload, FaEye } from "react-icons/fa";

// --- SVG Icon Components ---
// By using inline SVGs, we remove the need for the external 'react-icons' library.
const HistoryIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-248 50c-25.45 0-46-20.55-46-46s20.55-46 46-46 46 20.55 46 46-20.55 46-46 46zm-98.5-224.5L138 218c-5.15 11.9 4.2 22 17.5 22h189c13.3 0 22.65-10.1 17.5-22l-17.5-136.5C340.45 62.2 324.95 48 307.5 48h-103c-17.45 0-32.95 14.2-37 31.5z"></path>
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8l-22.4 30.8c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
  </svg>
);

const VideoIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 576 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"></path>
  </svg>
);

const WarningIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 576 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-60.035-39.993-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.982 12.654z"></path>
  </svg>
);

const HistorySection = () => {
  const [historyClips, setHistoryClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoErrors, setVideoErrors] = useState(new Set());

  useEffect(() => {
    const fetchHistoryClips = async () => {
      try {
        const response = await axios.get("http://localhost:5000/history_clips");
        const clipsData = response.data || [];

        // The backend provides a relative URL (e.g., /history_clips/clip.mp4).
        // We prepend the backend's base URL to create a full, playable path for the video player.
        const clipsWithUrls = clipsData.map((clip) => ({
          ...clip,
          videoUrl: `http://localhost:5000${clip.url}`,
          thumbnailUrl: clip.thumbnail_url ? `http://localhost:5000${clip.thumbnail_url}` : null,
        }));

        setHistoryClips(clipsWithUrls);
      } catch (err) {
        console.error("Failed to fetch clips: ", err);
        setHistoryClips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryClips();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Video History
          </h1>
          <p className="text-gray-400 text-lg">Recorded security incidents and surveillance footage</p>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 text-lg">Loading video history...</p>
          </motion.div>
        ) : historyClips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-600">
              <FaVideo className="text-gray-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No Recordings Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Security footage will appear here when incidents are detected and recorded by the system.
            </p>
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <p className="text-sm text-gray-400">
                💡 <strong>Tip:</strong> The system automatically records video clips when violence or suspicious activity is detected.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {historyClips.map((clip, index) => {
              const readableTime = new Date(clip.timestamp).toLocaleString();

              return (
                <motion.div
                  key={clip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-2xl border border-gray-600 hover:border-blue-400/50 transition-all duration-300"
                >
                  {/* Video Thumbnail */}
                  <div className="relative group">
                    {clip.videoUrl && !videoErrors.has(clip.id) ? (
                      <div className="aspect-video bg-black overflow-hidden">
                        <video
                          key={clip.videoUrl}
                          src={clip.videoUrl}
                          poster={clip.thumbnailUrl}
                          className="w-full h-full object-cover"
                          preload="none"
                          muted
                          onError={(e) => {
                            console.error(`Error loading video: ${clip.videoUrl}`, e.target.error);
                            setVideoErrors(prev => new Set([...prev, clip.id]));
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                          >
                            <FaPlay className="text-white ml-1" />
                          </motion.div>
                        </div>
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white flex items-center gap-1">
                          <FaEye className="text-blue-400" />
                          <span>HD</span>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-600 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-3">
                          <WarningIcon className="text-red-400 text-2xl" />
                        </div>
                        <p className="text-gray-400 text-sm text-center">
                          {videoErrors.has(clip.id) ? "Video Corrupted" : "Video Unavailable"}
                        </p>
                        <p className="text-gray-500 text-xs text-center mt-1">
                          {videoErrors.has(clip.id) ? "Recording failed" : "No video file"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <FaClock className="text-blue-400" />
                      <span>{readableTime}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 truncate">
                      {clip.filename}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <FaVideo className="text-green-400" />
                        <span>MP4</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: videoErrors.has(clip.id) ? 1 : 1.05 }}
                        whileTap={{ scale: videoErrors.has(clip.id) ? 1 : 0.95 }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                          videoErrors.has(clip.id)
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        }`}
                        onClick={() => !videoErrors.has(clip.id) && window.open(clip.videoUrl, '_blank')}
                        disabled={videoErrors.has(clip.id)}
                      >
                        <FaDownload />
                        {videoErrors.has(clip.id) ? 'Corrupted' : 'View'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Decorative bottom border */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;
