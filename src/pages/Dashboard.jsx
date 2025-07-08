import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSignInAlt, FaUsers, FaVideo } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [joinId, setJoinId] = useState('');
  const userName = 'Alex'; // This would come from authentication context

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const generateRoomId = () => {
    return 'room-' + Math.random().toString(36).substring(2, 8);
  };

  const handleCreateRoom = () => {
    const roomId = generateRoomId();
    navigate(`/room/${roomId}`);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (joinId.trim()) {
      navigate(`/room/${joinId.trim()}`);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userName}!</h1>
              <p className="text-gray-600 mt-1">Ready to watch something together?</p>
            </div>
            <div className="hidden md:block">
              <FaVideo className="text-4xl text-blue-500" />
            </div>
          </div>
        </motion.div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Create Room Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlus className="text-2xl text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Create Room</h2>
            <p className="text-gray-600 mb-6">
              Start a new room and invite friends to watch together
            </p>
            <motion.button
              onClick={handleCreateRoom}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
            >
              Create New Room
            </motion.button>
          </motion.div>

          {/* Join Room Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSignInAlt className="text-2xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">Join Room</h2>
            <p className="text-gray-600 mb-6 text-center">
              Enter a room ID to join your friends
            </p>
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <input
                type="text"
                value={joinId}
                onChange={(e) => setJoinId(e.target.value)}
                placeholder="Enter Room ID (e.g., room-abc123)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                Join Room
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <FaUsers className="text-blue-500 text-xl" />
              <span className="text-gray-700">Synchronized Playback</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <FaVideo className="text-green-500 text-xl" />
              <span className="text-gray-700">P2P Streaming</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <FaSignInAlt className="text-purple-500 text-xl" />
              <span className="text-gray-700">Live Chat</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
