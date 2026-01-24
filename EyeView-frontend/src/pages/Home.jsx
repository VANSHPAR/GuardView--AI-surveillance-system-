// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.2,
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   }),
// };

// function Home({ user }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 md:px-20 pt-20 relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

//       <motion.div
//         className="max-w-6xl w-full flex flex-col items-start gap-8 relative z-10"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         {/* Heading */}
//         <motion.div className="flex-1" variants={fadeUp} custom={1}>
//           <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6">
//             <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//               Real-Time Violence
//             </span>
//             <br />
//             <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
//               Detection Powered by AI
//             </span>
//           </h1>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
//         </motion.div>

//         {/* Paragraph & Button */}
//         <motion.div className="flex-1 max-w-2xl" variants={fadeUp} custom={2}>
//           <p className="text-gray-300 text-xl md:text-2xl mb-10 leading-relaxed">
//             Stay one step ahead with <strong className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">eyeview.ai</strong> — monitor live feeds,
//             detect violent behavior, and send instant alerts to keep your environment safe.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link to={user ? "/dashboard" : "/login"}>
//               <motion.button
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-10 py-4 rounded-2xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
//                 variants={fadeUp}
//                 custom={3}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {user ? "Go to Dashboard" : "Start Live Detection"}
//               </motion.button>
//             </Link>

//             {!user && (
//               <Link to="/signup">
//                 <motion.button
//                   className="border-2 border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white text-lg px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
//                   variants={fadeUp}
//                   custom={4}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Create Account
//                 </motion.button>
//               </Link>
//             )}
//           </div>
//         </motion.div>

//         {/* Feature highlights */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full"
//           variants={fadeUp}
//           custom={5}
//         >
//           <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300">
//             <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
//               <span className="text-blue-400 text-2xl">🎯</span>
//             </div>
//             <h3 className="text-xl font-semibold mb-2">AI-Powered Detection</h3>
//             <p className="text-gray-400">Advanced YOLO models for accurate real-time violence detection</p>
//           </div>

//           <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-green-400/50 transition-all duration-300">
//             <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
//               <span className="text-green-400 text-2xl">📱</span>
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
//             <p className="text-gray-400">SMS and email notifications sent immediately upon detection</p>
//           </div>

//           <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-purple-400/50 transition-all duration-300">
//             <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
//               <span className="text-purple-400 text-2xl">☁️</span>
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Cloud Storage</h3>
//             <p className="text-gray-400">Secure Firebase storage for all recorded incidents and data</p>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

// export default Home;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function Home({ user }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 md:px-20 pt-20 relative overflow-hidden">
      {/* Background decorative elements with dynamic positions */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>

      <motion.div
        className="max-w-6xl w-full flex flex-col items-start gap-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading with enhanced styling */}
        <motion.div className="flex-1" variants={fadeUp} custom={1}>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Real-Time Violence
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Detection Powered by AI
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
        </motion.div>

        {/* Paragraph & Button */}
        <motion.div className="flex-1 max-w-2xl" variants={fadeUp} custom={2}>
          <p className="text-gray-300 text-xl md:text-2xl mb-10 leading-relaxed">
            Stay one step ahead with{" "}
            <strong className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              eyeview.ai
            </strong>{" "}
            — monitor live feeds, detect violent behavior, and send instant
            alerts to keep your environment safe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to={user ? "/dashboard" : "/login"}>
              <motion.button
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-10 py-4 rounded-2xl font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                variants={fadeUp}
                custom={3}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></span>
                <span className="relative z-10">
                  {user ? "Go to Dashboard" : "Start Live Detection"}
                </span>
              </motion.button>
            </Link>

            {!user && (
              <Link to="/signup">
                <motion.button
                  className="border-2 border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white text-lg px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
                  variants={fadeUp}
                  custom={4}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Account
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full"
          variants={fadeUp}
          custom={5}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-blue-400 text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Detection</h3>
            <p className="text-gray-400">
              Advanced YOLO models for accurate real-time violence detection
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-green-400/50 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-green-400 text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Alerts</h3>
            <p className="text-gray-400">
              SMS and email notifications sent immediately upon detection
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-purple-400/50 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-purple-400 text-2xl">☁️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Cloud Storage</h3>
            <p className="text-gray-400">
              Secure Firebase storage for all recorded incidents and data
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
