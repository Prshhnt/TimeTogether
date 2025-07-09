import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaUsers, FaVideo, FaComment, FaSync, FaMobile } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: <FaSync className="text-3xl text-blue-500" />,
      title: "Synchronized Playback",
      description: "Watch videos in perfect sync with friends across any device"
    },
    {
      icon: <FaUsers className="text-3xl text-green-500" />,
      title: "Group Viewing",
      description: "Create private rooms and invite friends to watch together"
    },
    {
      icon: <FaComment className="text-3xl text-purple-500" />,
      title: "Live Chat",
      description: "Chat in real-time while watching your favorite content"
    },
    {
      icon: <FaVideo className="text-3xl text-red-500" />,
      title: "High Quality",
      description: "Stream in HD with minimal lag and maximum enjoyment"
    },
    {
      icon: <FaMobile className="text-3xl text-indigo-500" />,
      title: "Cross-Device",
      description: "Works seamlessly on desktop, tablet, and mobile devices"
    },
    {
      icon: <FaPlay className="text-3xl text-orange-500" />,
      title: "Easy to Use",
      description: "Simple interface that anyone can use in seconds"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            TimeTogether
          </h1>
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Watch videos together, perfectly synchronized across all devices.
            <br />
            Create rooms, invite friends, and enjoy content like never before.
          </p>
          {/* CTA Button */}
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-semibold px-12 py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Get Started Free
          </button>
          {/* Demo Info */}
          <p className="text-gray-500 mt-4">
            No credit card required • Free forever
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose TimeTogether?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of synchronized video watching with features designed for seamless group entertainment.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Watch Together?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already enjoying synchronized video experiences.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-600 text-xl font-semibold px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start Watching Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">TimeTogether</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                The ultimate platform for synchronized video watching with friends and family, no matter where they are.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TimeTogether. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
