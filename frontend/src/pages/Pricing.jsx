import React, { useState } from "react";
import { FaCheck, FaCrown, FaRocket, FaStar, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const pricingPlans = [
  {
    name: "Basic",
    monthlyPrice: 2499,
    description: "Perfect for small retail spaces and standalone offices",
    icon: <FaShieldAlt className="text-blue-400" size={32} />,
    features: [
      "Up to 5 camera streams",
      "Real-time violence detection",
      "SMS alerts via Mail",
      "Basic incident analytics",
      "Mobile dashboard access",
      "Standard 24/7 support"
    ],
    popular: false,
    bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    buttonColor: "from-blue-500 to-cyan-500",
  },
  {
    name: "Pro",
    monthlyPrice: 6999,
    description: "Ideal for growing enterprises, malls and warehouses",
    icon: <FaRocket className="text-purple-400" size={32} />,
    features: [
      "Up to 25 camera streams",
      "Multi-model AI (Violence, Shoplifting, Accidents)",
      "Instant SMS & Email alerts",
      "Advanced analytics & trend heatmaps",
      "Full API & Webhook integration",
      "Priority telephone support",
      "30-day cloud evidence retention"
    ],
    popular: true,
    bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    buttonColor: "from-purple-500 to-pink-500",
  },
  {
    name: "Enterprise",
    monthlyPrice: 17999,
    description: "For large institutions, public infrastructure & airports",
    icon: <FaCrown className="text-yellow-400" size={32} />,
    features: [
      "Unlimited surveillance cameras",
      "Custom trained YOLO models",
      "Multi-channel emergency dispatch",
      "Air-gapped on-premise deployment option",
      "Dedicated account manager",
      "Custom SLA guarantees (99.99%)",
      "Indefinite encrypted cloud archive"
    ],
    popular: false,
    bgColor: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
    buttonColor: "from-yellow-500 to-orange-500",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const navigate = useNavigate();

  const handleSelectPlan = (planName) => {
    toast.success(`Selected ${planName} plan (${billingPeriod})`);
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 py-16 md:px-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Predictable, Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Scale your physical security infrastructure with enterprise computer vision and autonomous alert dispatch.
          </p>

          {/* Billing Period Toggle Switch */}
          <div className="inline-flex items-center bg-gray-800/90 p-1.5 rounded-2xl border border-gray-700 shadow-lg">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Annual Billing
              <span className="bg-green-500 text-gray-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 items-stretch"
        >
          {pricingPlans.map((plan, index) => {
            const finalPrice = billingPeriod === 'annual'
              ? Math.round(plan.monthlyPrice * 0.8)
              : plan.monthlyPrice;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`relative backdrop-blur-sm border rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-2xl scale-105'
                    : `${plan.bgColor} border-white/10 hover:border-white/20`
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <FaStar size={12} />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-center mb-8">
                    <div className="inline-flex p-4 rounded-2xl bg-white/5 mb-4 border border-white/10">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-xs mb-6 h-10">{plan.description}</p>

                    <div className="mb-2">
                      <span className="text-4xl font-extrabold text-white">
                        ₹{finalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-gray-400 text-sm"> / month</span>
                    </div>
                    {billingPeriod === 'annual' && (
                      <p className="text-xs text-green-400 font-medium">Billed annually (Save 20%)</p>
                    )}
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm">
                        <div className="flex-shrink-0 w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                          <FaCheck className="text-green-400 text-[10px]" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full bg-gradient-to-r ${plan.buttonColor} text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl text-sm`}
                >
                  Get Started with {plan.name}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enterprise Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Need a custom surveillance rollout?</h3>
              <p className="text-gray-400 text-sm max-w-lg">
                We support private cloud deployments, custom edge AI camera boxes, and compliance integrations.
              </p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-lg whitespace-nowrap"
            >
              Contact Sales Team
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;