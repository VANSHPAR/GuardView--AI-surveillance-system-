import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Template = ({ title, desc1, decs2, image, formType, setIsLoggedIn }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            eyeview.ai
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          {/* Left Section - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col w-full lg:w-1/2 max-w-[450px]"
          >
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 text-center">
                {title}
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center">
                <span className="text-gray-300">{desc1}</span>
                <br />
                <span className="text-blue-400 italic font-medium">{decs2}</span>
              </p>

              {/* Form */}
              {formType === "signup" ? (
                <SignupForm setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
              )}

              {/* Switch between login/signup */}
              <div className="text-center mt-6">
                <p className="text-gray-400">
                  {formType === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
                  <Link
                    to={formType === "signup" ? "/login" : "/signup"}
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    {formType === "signup" ? "Sign In" : "Sign Up"}
                  </Link>
                </p>
              </div>

            </div>
          </motion.div>

          {/* Right Section - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-full lg:w-1/2 max-w-[500px] flex justify-center items-center"
          >
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>

              {/* Main image container */}
              <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
                <img
                  src={image}
                  alt="Authentication illustration"
                  className="w-full h-auto rounded-2xl shadow-lg"
                  loading="lazy"
                />

                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-2xl">👁️</span>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-white text-2xl">🔒</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            By signing {formType === "signup" ? "up" : "in"}, you agree to our{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Template;
