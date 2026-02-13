import { Music, Settings, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useRef, useEffect } from "react";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../context/LanguageContext";

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
  const { t } = useLanguage();
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
      label: t("actionMenu.music"),
      onClick: onMusicClick,
      color: "text-pink-500",
      isActive: isMusicActive,
    },
    {
      icon: Sparkles,
      label: t("actionMenu.effects"),
      onClick: onSparklesClick,
      color: "text-purple-500",
      isActive: isSparklesActive,
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed top-4 right-4 z-100 pointer-events-auto flex items-center gap-2"
    >
      <motion.div
        className="flex gap-1.5"
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
              className={`btn btn-circle btn-sm btn-ghost relative ${
                btn.isActive ? btn.color : "text-base-content/40 opacity-50"
              } hover:bg-base-200 transition-all`}
              title={btn.label}
              animate={{
                scale: btn.isActive ? 1 : 0.9,
              }}
            >
              <btn.icon className="size-4" />
              {!btn.isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-5 h-0.5 bg-current rotate-45"></div>
                </div>
              )}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className="btn btn-circle btn-sm btn-ghost"
        title={t("actionMenu.menu")}
      >
        <Settings className="w-5 h-5 flex items-center justify-center" />
      </motion.button>

      <LanguageToggle />
      <ThemeToggle />
    </div>
  );
}
