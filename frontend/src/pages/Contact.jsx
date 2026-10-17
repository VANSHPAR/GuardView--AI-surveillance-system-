import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaClock, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay * 0.2,
      ease: "easeOut",
    },
  }),
};

const contactInfo = [
  {
    icon: <FaEnvelope className="text-blue-400" size={32} />,
    title: "Email",
    value: "support@GuardView.ai",
    description: "Send us an email anytime",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    icon: <FaPhoneAlt className="text-green-400" size={32} />,
    title: "Phone",
    value: "+91 98987 56423",
    description: "Call us for immediate support",
    bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-500/20",
  },
  {
    icon: <FaMapMarkerAlt className="text-purple-400" size={32} />,
    title: "Location",
    value: "Vadodara, Gujarat, India",
    description: "Our headquarters",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    toast.success('Thank you for your message! We will get back to you soon.');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white px-6 md:px-20 py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
            variants={fadeIn}
            custom={1}
          >
            Contact Us
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={fadeIn}
            custom={2}
          >
            Got a question, feedback, or partnership idea? Reach out to us and
            let's connect. We're always here to help make your security better.
          </motion.p>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              custom={index + 3}
              className={`backdrop-blur-sm ${contact.bgColor} border ${contact.borderColor} rounded-3xl p-8 hover:border-white/30 transition-all duration-300 group cursor-pointer`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-white/10 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {contact.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{contact.title}</h3>
                <p className="text-gray-200 font-medium text-lg mb-2">{contact.value}</p>
                <p className="text-gray-400 text-sm">{contact.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Additional Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              variants={fadeIn}
              custom={6}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mr-4">
                  <FaClock className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">Response Time</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We typically respond to all inquiries within 24 hours during business days.
                For urgent security matters, we provide immediate support.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              custom={7}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mr-4">
                  <FaGlobe className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">Global Support</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Our team provides support across multiple time zones and languages.
                Whether you're in Mumbai, New York, or London, we're here to help.
              </p>
            </motion.div>
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            custom={8}
            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mr-4">
                <FaPaperPlane className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Send Us Your Feedback
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="6"
                  required
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Submit Feedback
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
