
import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import { socket } from '../utils/socket';

// roomId will be passed as a prop


const VideoPlayer = ({ roomId }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const isInitializing = useRef(false);
  // Prevent feedback loop for sync events
  const isRemoteAction = useRef(false);

  // --- SOCKET.IO SYNC ---
  useEffect(() => {
    if (!roomId) return;
    socket.connect();
    socket.emit('joinRoom', roomId);

    // Listen for sync events from server
    socket.on('play', () => {
      console.log('[Socket.IO] Received play event');
      if (playerRef.current && playerRef.current.paused()) {
        isRemoteAction.current = true;
        playerRef.current.play();
      }
    });
    socket.on('pause', () => {
      console.log('[Socket.IO] Received pause event');
      if (playerRef.current && !playerRef.current.paused()) {
        isRemoteAction.current = true;
        playerRef.current.pause();
      }
    });
    socket.on('seek', ({ currentTime }) => {
      console.log('[Socket.IO] Received seek event:', currentTime);
      if (playerRef.current) {
        isRemoteAction.current = true;
        playerRef.current.currentTime(currentTime);
      }
    });
    socket.on('changePlaybackSpeed', ({ speed }) => {
      console.log('[Socket.IO] Received changePlaybackSpeed event:', speed);
      if (playerRef.current) {
        isRemoteAction.current = true;
        playerRef.current.playbackRate(speed);
      }
    });

    return () => {
      socket.off('play');
      socket.off('pause');
      socket.off('seek');
      socket.off('changePlaybackSpeed');
      socket.disconnect();
    };
  }, []);

  // --- VIDEO.JS INIT ---
  useEffect(() => {
    const videoElement = videoRef.current;
    
    // Prevent multiple initializations
    if (!videoElement || playerRef.current || isInitializing.current) {
      return;
    }

    // Check if element already has a Video.js player
    if (videoElement.player && !videoElement.player.isDisposed()) {
      console.log('Using existing Video.js player');
      playerRef.current = videoElement.player;
      setIsPlayerReady(true);
      return;
    }

    isInitializing.current = true;
    console.log('Initializing Video.js player...');
    
    const videoOptions = {
      controls: true,
      fluid: true,
      responsive: true,
      preload: 'auto',
      sources: [
        {
          src: 'https://www.w3schools.com/html/mov_bbb.mp4',
          type: 'video/mp4',
        },
      ],
    };

    // Use setTimeout to ensure DOM is ready and avoid StrictMode issues
    const timer = setTimeout(() => {
      try {
        playerRef.current = videojs(videoElement, videoOptions, function() {
          console.log('Video.js player is ready!');
          setIsPlayerReady(true);
          isInitializing.current = false;
        });
      } catch (error) {
        console.error('Error initializing Video.js:', error);
        isInitializing.current = false;
      }
    }, 0);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      isInitializing.current = false;
      
      // Only dispose if we actually created the player in this effect
      if (playerRef.current && !playerRef.current.isDisposed()) {
        try {
          console.log('Disposing Video.js player...');
          playerRef.current.dispose();
        } catch (error) {
          console.error('Error disposing player:', error);
        } finally {
          playerRef.current = null;
          setIsPlayerReady(false);
        }
      }
    };
  }, []); // Empty dependency array

  // --- EMIT EVENTS ON LOCAL USER ACTIONS ---
  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return;
    const player = playerRef.current;

    // Play
    const handlePlay = () => {
      if (isRemoteAction.current) {
        isRemoteAction.current = false;
        return;
      }
      console.log('[Socket.IO] Emitting play event');
      socket.emit('play', roomId);
    };
    // Pause
    const handlePause = () => {
      if (isRemoteAction.current) {
        isRemoteAction.current = false;
        return;
      }
      console.log('[Socket.IO] Emitting pause event');
      socket.emit('pause', roomId);
    };
    // Seek
    const handleSeek = () => {
      if (isRemoteAction.current) {
        isRemoteAction.current = false;
        return;
      }
      const t = player.currentTime();
      console.log('[Socket.IO] Emitting seek event:', t);
      socket.emit('seek', { roomId, currentTime: t });
    };
    // Playback speed
    const handleRateChange = () => {
      if (isRemoteAction.current) {
        isRemoteAction.current = false;
        return;
      }
      const s = player.playbackRate();
      console.log('[Socket.IO] Emitting changePlaybackSpeed event:', s);
      socket.emit('changePlaybackSpeed', { roomId, speed: s });
    };

    player.on('play', handlePlay);
    player.on('pause', handlePause);
    player.on('seeked', handleSeek);
    player.on('ratechange', handleRateChange);

    return () => {
      player.off('play', handlePlay);
      player.off('pause', handlePause);
      player.off('seeked', handleSeek);
      player.off('ratechange', handleRateChange);
    };
  }, [isPlayerReady]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          Video Player {isPlayerReady ? '✅' : '⏳'}
        </h2>
        <div className="w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            className="video-js vjs-default-skin w-full"
            controls
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
