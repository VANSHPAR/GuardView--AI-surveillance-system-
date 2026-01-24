import React, { useState } from 'react'
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext';
import { motion } from "framer-motion";

function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "", password: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }

    async function submitHandler(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
            navigate("/dashboard");
        } catch (error) {
            // Error is handled in the auth context with toast
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-6'>
            {/* Email Field */}
            <div className='w-full'>
                <label className='block'>
                    <span className='text-sm font-medium text-gray-300 mb-2 block'>
                        Email Address <span className='text-red-400'>*</span>
                    </span>
                    <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder='Enter your email'
                        name="email"
                        className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm'
                    />
                </label>
            </div>

            {/* Password Field */}
            <div className='w-full'>
                <label className='block'>
                    <span className='text-sm font-medium text-gray-300 mb-2 block'>
                        Password <span className='text-red-400'>*</span>
                    </span>
                    <div className="relative">
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="Enter your password"
                            name="password"
                            className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? (
                                <FaRegEye size={20} />
                            ) : (
                                <FaEyeSlash size={20} />
                            )}
                        </button>
                    </div>
                </label>

                {/* Forgot Password Link */}
                <Link to="#" className="block text-right mt-2">
                    <span className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        Forgot Password?
                    </span>
                </Link>
            </div>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2'
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing In...
                    </>
                ) : (
                    'Sign In'
                )}
            </motion.button>
        </form>
    )
}

export default LoginForm

      