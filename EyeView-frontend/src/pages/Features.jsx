import React from "react";
import { FaVideo, FaBell, FaCloudUploadAlt, FaMobileAlt, FaLock, FaShieldAlt, FaRocket } from "react-icons/fa";
import { MdSecurity, MdAnalytics } from "react-icons/md";
import { motion } from "framer-motion";

const featuresData = [
  {
    title: "Live Video Detection",
    description:
      "Continuously analyzes video feed using an AI model (YOLO v11) to detect violent behavior in real-time, ensuring no threat goes unnoticed.",
    icon: <FaVideo size={32} />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Real-Time Alerts to Admin",
    description:
      "Sends instant alerts to administrators via Twilio when violence is detected, enabling fast action and prevention.",
    icon: <FaBell size={32} />,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
  },
  {
    title: "Incident Clip Recording",
    description:
      "Automatically records a 10-second clip of the detected incident and stores it securely for future review or evidence.",
    icon: <FaCloudUploadAlt size={32} />,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
  },
  {
    title: "Firebase + Twilio Integration",
    description:
      "Utilizes Firebase for secure cloud storage of clips and Twilio to deliver SMS/email alerts instantly upon detection.",
    icon: <MdSecurity size={32} />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Mobile-Friendly Interface",
    description:
      "Fully responsive design allows administrators to monitor activity and receive alerts directly from mobile devices.",
    icon: <FaMobileAlt size={32} />,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10",
  },
  {
    title: "Secure & Private",
    description:
      "All data and clips are encrypted and securely stored to protect privacy and ensure tamper-proof incident logs.",
    icon: <FaLock size={32} />,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-red-500/10 to-pink-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 py-16 md:px-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            eyeview.ai Features
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the powerful capabilities that make eyeview.ai the ultimate AI-powered surveillance solution
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className={`backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 ${feature.bgColor} hover:border-white/20 group`}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Ready to Transform Your Security?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations already using eyeview.ai to enhance their surveillance capabilities
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
