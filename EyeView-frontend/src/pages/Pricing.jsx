import React, { useState } from "react";
import { FaCheck, FaCrown, FaRocket, FaStar, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const pricingPlans = [
  {
    name: "Basic",
    price: "₹2,499",
    period: "month",
    description: "Perfect for small businesses and startups",
    icon: <FaShieldAlt className="text-blue-400" size={32} />,
    features: [
      "Up to 5 cameras",
      "Real-time violence detection",
      "Email alerts",
      "Basic analytics",
      "Mobile app access",
      "24/7 email support"
    ],
    popular: false,
    bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
    buttonColor: "from-blue-500 to-cyan-500",
  },
  {
    name: "Pro",
    price: "₹6,999",
    period: "month",
    description: "Ideal for growing businesses and enterprises",
    icon: <FaRocket className="text-purple-400" size={32} />,
    features: [
      "Up to 25 cameras",
      "Advanced AI detection",
      "SMS & email alerts",
      "Advanced analytics dashboard",
      "API access",
      "Priority phone support",
      "Custom integrations",
      "Incident video storage (30 days)"
    ],
    popular: true,
    bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20",
    buttonColor: "from-purple-500 to-pink-500",
  },
  {
    name: "Enterprise",
    price: "₹17,999",
    period: "month",
    description: "For large organizations with complex needs",
    icon: <FaCrown className="text-yellow-400" size={32} />,
    features: [
      "Unlimited cameras",
      "Premium AI models",
      "Multi-channel alerts",
      "Enterprise analytics",
      "White-label solution",
      "Dedicated account manager",
      "Custom AI training",
      "Unlimited storage",
      "SLA guarantee",
      "On-premise deployment option"
    ],
    popular: false,
    bgColor: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
    borderColor: "border-yellow-500/20",
    buttonColor: "from-yellow-500 to-orange-500",
  }
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

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 py-16 md:px-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Select the perfect plan for your security needs. All plans include our core AI-powered violence detection technology.
          </p>

          {/* Billing Period Info */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
            <span className="text-white font-semibold">Monthly Subscription</span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`relative backdrop-blur-sm border rounded-3xl p-8 transition-all duration-300 group ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 scale-105 shadow-2xl shadow-purple-500/20'
                  : `${plan.bgColor} border-white/10 hover:border-white/20`
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <FaStar size={14} />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex p-4 rounded-2xl ${plan.bgColor} mb-6`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-lg">
                    /{plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                      <FaCheck className="text-green-400 text-xs" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full bg-gradient-to-r ${plan.buttonColor} hover:opacity-90 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Get Started with {plan.name}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Have unique requirements or need enterprise-grade features? Contact our team for a personalized quote.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Sales Team
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;