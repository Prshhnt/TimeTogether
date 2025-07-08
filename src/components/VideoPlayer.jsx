import React, { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const isInitializing = useRef(false);

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

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
      <h2>Video Player {isPlayerReady ? '✅' : '⏳'}</h2>
      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          controls
          preload="auto"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
