import { Music, Pause, Play, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MusicPlayer({ isOpen, onClose }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = [
    {
      title: "I Need a Girl - Leo",
      url: "/music/ineedagirl.mp3",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  // Initialize audio src on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[0].url;
      audioRef.current.volume = volume / 100;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <>
      <audio ref={audioRef} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-24 right-6 z-[99] bg-base-200 border border-base-300 rounded-2xl p-4 w-64 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music className="size-5" />
                <h3 className="font-semibold">NK's Radio</h3>
              </div>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-xs btn-circle"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {playlist.map((track, idx) => (
                <div
                  key={idx}
                  className="w-full text-left px-3 py-2 rounded-lg bg-primary text-primary-content"
                >
                  <div className="text-sm font-medium">{track.title}</div>
                  {isPlaying && (
                    <div className="text-xs opacity-75">Now playing...</div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={togglePlay}
              className="btn btn-primary btn-sm w-full gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="size-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="size-4" /> Play
                </>
              )}
            </button>

            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <Volume2 className="size-4" />
                <span className="text-xs font-medium">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="range range-sm w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
