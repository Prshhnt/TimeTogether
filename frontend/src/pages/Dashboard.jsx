import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSignInAlt, FaUsers, FaVideo, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@auth/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [joinId, setJoinId] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Get user name from Firebase user object
  const getUserName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName;
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0]; // Use part before @ as fallback
    }
    return 'User';
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

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 animate-fadein"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fadein"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, {getUserName()}!</h1>
              <p className="text-gray-600 mt-1">Ready to watch something together?</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <FaVideo className="text-4xl text-blue-500" />
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
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Create Room Card */}
        <div
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-fadein"
        >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlus className="text-2xl text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Create Room</h2>
            <p className="text-gray-600 mb-6">
              Start a new room and invite friends to watch together
            </p>
            <button
              onClick={handleCreateRoom}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-transform duration-200 hover:scale-105"
            >
              Create New Room
            </button>
          </div>

          {/* Join Room Card */}
        <div
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-fadein"
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
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-transform duration-200 hover:scale-105"
              >
                Join Room
              </button>
            </form>
          </div>
        </div>

        {/* User Info Card */}
        <div
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fadein"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Logged in as</p>
                <p className="font-semibold text-gray-800">{currentUser?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FaVideo className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Status</p>
                <p className="font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div
          className="bg-white rounded-2xl shadow-lg p-6 animate-fadein"
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
