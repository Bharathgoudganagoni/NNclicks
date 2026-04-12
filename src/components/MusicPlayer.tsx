import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    // Load YouTube API script
    const loadYoutubeApi = () => {
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        
        // Save the old callback if anything else was using it (best practice)
        const oldCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (oldCallback) oldCallback();
          if (isMounted) initPlayer();
        };

        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            document.head.appendChild(tag);
        }
      } else if (window.YT && window.YT.Player) {
        initPlayer();
      }
    };

    const initPlayer = () => {
      playerRef.current = new window.YT.Player('youtube-audio-player', {
        height: '1',
        width: '1',
        videoId: '4adZ7AguVcw', // Video ID from user: 4adZ7AguVcw
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: '4adZ7AguVcw', // Required for looping single video
          controls: 0,
          showinfo: 0,
          autohide: 1,
          modestbranding: 1,
          playsinline: 1
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(5); // Very low sound
            
            // Force autoplay immediately without waiting for interaction
            if (document.visibilityState === 'visible') {
               event.target.playVideo();
            }
            
            // Fallback: Try autoplay handling upon user scrolling or clicking just in case the browser blocks initial auto-play
            const handleInteract = () => {
              if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
                 const state = playerRef.current.getPlayerState();
                 if (state !== window.YT.PlayerState.PLAYING && document.visibilityState === 'visible') {
                    playerRef.current.playVideo();
                 }
              }
              document.removeEventListener("click", handleInteract);
              document.removeEventListener("scroll", handleInteract);
            };
            document.addEventListener("click", handleInteract);
            document.addEventListener("scroll", handleInteract);

            // Visibility changes (switching tabs)
            document.addEventListener("visibilitychange", () => {
              if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
                if (document.hidden) {
                  playerRef.current.pauseVideo();
                } else {
                  playerRef.current.playVideo();
                }
              }
            });
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            }
          }
        }
      });
    };

    loadYoutubeApi();

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, []);

  const togglePlay = () => {
    if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
      const state = playerRef.current.getPlayerState();
      // If it's playing, pause it. Otherwise, play it.
      if (state === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3"
    >
      <button
        onClick={togglePlay}
        className="w-8 h-8 bg-black/60 border border-gold/40 rounded-full flex items-center justify-center backdrop-blur-md text-gold hover:bg-gold hover:text-black transition-all hover:scale-110 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
      
      {isPlaying && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="text-xs text-gold/80 tracking-widest uppercase font-display hidden sm:block bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-gold/20"
        >
          Now Playing
        </motion.div>
      )}

      {/* Hidden container for the YouTube API iframe (1x1 sizing but visually invisible) */}
      <div className="absolute opacity-0 pointer-events-none w-1 h-1 overflow-hidden">
        <div id="youtube-audio-player"></div>
      </div>
    </motion.div>
  );
}
