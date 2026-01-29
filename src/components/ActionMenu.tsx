import { Music, Settings, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useRef, useEffect } from "react";

interface ActionMenuProps {
  onMusicClick: () => void;
  onSparklesClick: () => void;
  isMusicActive?: boolean;
  isSparklesActive?: boolean;
}

export function ActionMenu({
  onMusicClick,
  onSparklesClick,
  isMusicActive = false,
  isSparklesActive = false,
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const buttons = [
    {
      icon: Music,
      label: "Music",
      onClick: onMusicClick,
      color: "text-pink-500",
      isActive: isMusicActive,
    },
    {
      icon: Sparkles,
      label: "Effects",
      onClick: onSparklesClick,
      color: "text-purple-500",
      isActive: isSparklesActive,
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed top-6 right-6 z-100 pointer-events-auto flex items-center gap-3"
    >
      <motion.div
        className="flex gap-2"
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {buttons.map((btn, idx) => (
          <motion.div
            key={idx}
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{ delay: idx * 0.1 }}
          >
            <motion.button
              onClick={() => {
                btn.onClick();
              }}
              className={`btn btn-circle btn-ghost relative ${
                btn.isActive ? btn.color : "text-base-content/40 opacity-50"
              } hover:bg-base-200 transition-all`}
              title={btn.label}
              animate={{
                scale: btn.isActive ? 1 : 0.9,
              }}
            >
              <btn.icon className="size-5" />
              {!btn.isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-6 h-0.5 bg-current rotate-45"></div>
                </div>
              )}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className="btn btn-circle btn-ghost"
        title="Menu"
      >
        <Settings className="w-6 h-6 flex items-center justify-center" />
      </motion.button>

      <ThemeToggle />
    </div>
  );
}
