import React from "react";
import {
  FiZap,
  FiPhoneCall,
  FiVideo,
  FiLock,
  FiSmartphone,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import { AiOutlineRobot, AiOutlineRocket, AiOutlineGlobal } from "react-icons/ai";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FiZap className="text-yellow-400" size={28} />,
    text: "Real-time violence detection with high accuracy",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: <FiPhoneCall className="text-blue-400" size={28} />,
    text: "Instant alerts to admin using Twilio",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: <FiVideo className="text-purple-400" size={28} />,
    text: "Automated incident clip recording",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: <FiLock className="text-green-400" size={28} />,
    text: "Firebase-backed secure storage",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: <FiSmartphone className="text-indigo-400" size={28} />,
    text: "Mobile and desktop friendly UI",
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    icon: <AiOutlineRobot className="text-pink-400" size={28} />,
    text: "Trained on YOLO v11 AI model",
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: <AiOutlineRocket className="text-orange-400" size={28} />,
    text: "Easy integration with existing surveillance systems",
    color: "from-orange-500/20 to-red-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 md:px-20 py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            About eyeview.ai
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Revolutionizing surveillance with AI-powered intelligence and proactive security solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Main description cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mr-4">
                  <AiOutlineRobot className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AI-Powered Intelligence
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                <strong className="text-white">eyeview.ai</strong> is an advanced real-time surveillance solution powered by artificial intelligence. Built with security, accuracy, and scalability in mind, eyeview.ai is designed to detect violence, alert authorities instantly, and store critical evidence — all without human intervention.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mr-4">
                  <FiTarget className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Proactive Security
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                The system uses a pretrained YOLO v11 deep learning model to analyze live video feeds. Once violence is detected, eyeview.ai captures a 10-second clip and pushes real-time alerts via <strong className="text-white">Twilio</strong>, while data is securely stored in <strong className="text-white">Firebase</strong> for later review.
              </p>
            </motion.div>
          </div>

          {/* Mission statement */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-12 text-center"
          >
            <AiOutlineGlobal className="text-4xl text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Whether deployed in public spaces, educational institutions, offices, or residential societies, eyeview.ai provides an additional layer of smart security. It is equipped with a user-friendly dashboard, mobile camera support, and seamless integration capabilities, making it suitable for both small-scale and enterprise-grade environments.
            </p>
          </motion.div>

          {/* Vision statement */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-12 text-center"
          >
            <FiTrendingUp className="text-4xl text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              eyeview.ai is not just a project — it's a step towards building smarter, safer communities. With modern UI, responsive design, and robust backend infrastructure, eyeview.ai aims to revolutionize how surveillance is conducted across the globe.
            </p>
          </motion.div>

          {/* Features list */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-12">
              Why Choose eyeview.ai?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r ${feature.color} border border-white/10 hover:border-white/20 transition-all duration-300 group`}
                >
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300 text-lg">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
