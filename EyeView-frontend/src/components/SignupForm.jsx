import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { motion } from "framer-motion";

const SignupForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, formData.firstName, formData.lastName);
      navigate("/dashboard");
    } catch (error) {
      // Error is handled in the auth context
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Signup Form */}
      <form onSubmit={submitHandler} className="flex flex-col gap-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="w-full">
            <label className="block">
              <span className="text-sm font-medium text-gray-300 mb-2 block">
                First Name <span className="text-red-400">*</span>
              </span>
              <input
                required
                type="text"
                name="firstName"
                onChange={changeHandler}
                placeholder="Enter first name"
                value={formData.firstName}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </label>
          </div>

          {/* Last Name */}
          <div className="w-full">
            <label className="block">
              <span className="text-sm font-medium text-gray-300 mb-2 block">
                Last Name <span className="text-red-400">*</span>
              </span>
              <input
                required
                type="text"
                name="lastName"
                onChange={changeHandler}
                placeholder="Enter last name"
                value={formData.lastName}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </label>
          </div>
        </div>

        {/* Email */}
        <div className="w-full">
          <label className="block">
            <span className="text-sm font-medium text-gray-300 mb-2 block">
              Email Address <span className="text-red-400">*</span>
            </span>
            <input
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter your email"
              value={formData.email}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            />
          </label>
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="block">
            <span className="text-sm font-medium text-gray-300 mb-2 block">
              Create Password <span className="text-red-400">*</span>
            </span>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={changeHandler}
                placeholder="Create a strong password"
                value={formData.password}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </button>
            </div>
          </label>
        </div>

        {/* Confirm Password */}
        <div className="w-full">
          <label className="block">
            <span className="text-sm font-medium text-gray-300 mb-2 block">
              Confirm Password <span className="text-red-400">*</span>
            </span>
            <div className="relative">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={changeHandler}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </button>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default SignupForm;
