import React, { useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUsers, FaSignOutAlt, FaCopy } from 'react-icons/fa';
import { useAuth } from '@auth/AuthContext';
import VideoPlayer from './VideoPlayer';

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);



  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCopyRoomLink = async () => {
    const roomLink = window.location.href;
    try {
      await navigator.clipboard.writeText(roomLink);
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const getUserName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 animate-fadein"
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FaArrowLeft />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <FaUsers className="text-blue-500" />
                <span className="font-semibold text-gray-800">Room: {roomId}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Watching as</p>
                  <p className="font-semibold text-gray-800">{getUserName()}</p>
                </div>
              </div>

              {/* Copy Room Link Button */}
              <div className="relative">
                <button
                  onClick={handleCopyRoomLink}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-transform duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <FaCopy />
                  <span className="hidden sm:inline">Copy Link</span>
                </button>
                
                {/* Copy confirmation message */}
                {showCopyMessage && (
                  <div
                    className="absolute top-full mt-2 right-0 bg-green-500 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-fadein"
                  >
                    Link copied!
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-transform duration-200 ${
                  isLoggingOut
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl hover:scale-105'
                } text-white`}
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Room Info Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-blue-800 font-medium">
                You're connected to room {roomId}
              </span>
            </div>
            <div className="text-sm text-blue-600">
              Share the room link to invite friends
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="p-4">
        <VideoPlayer roomId={roomId} />
      </div>
    </div>
  );
};

export default RoomPage;
