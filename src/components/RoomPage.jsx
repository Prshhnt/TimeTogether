import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaUsers } from 'react-icons/fa';
import VideoPlayer from './VideoPlayer';

const RoomPage = () => {
  const { roomId } = useParams();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <FaUsers className="text-blue-500" />
                <span className="font-semibold text-gray-800">Room: {roomId}</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="text-sm text-gray-500">
                Share this link to invite friends
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="p-4">
        <VideoPlayer roomId={roomId} />
      </div>
    </motion.div>
  );
};

export default RoomPage;
