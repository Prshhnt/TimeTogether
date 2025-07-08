import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaUsers, FaComments, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const features = [
    {
      icon: <FaPlay className="text-3xl text-blue-500" />,
      title: "Synchronized Playback",
      description: "Watch videos in perfect sync with friends, no matter where they are."
    },
    {
      icon: <FaUsers className="text-3xl text-green-500" />,
      title: "Peer-to-Peer Streaming",
      description: "Stream large video files directly without uploading to servers."
    },
    {
      icon: <FaComments className="text-3xl text-purple-500" />,
      title: "Live Chat",
      description: "Chat with friends while watching your favorite content together."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-red-500" />,
      title: "Privacy Friendly",
      description: "Your videos stay private - no uploads, no data collection."
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-gray-800 mb-6"
        >
          TimeTogether
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl"
        >
          Watch Anything. With Anyone. In Perfect Sync.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
        >
          Get Started
        </motion.button>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center text-gray-800 mb-16"
          >
            Why Choose TimeTogether?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">TimeTogether</h3>
          <div className="flex justify-center space-x-8 mb-6">
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
          </div>
          <p className="text-gray-400">© 2025 TimeTogether. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
