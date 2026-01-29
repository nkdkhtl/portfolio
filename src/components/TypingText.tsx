import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TypingText({
  text,
  delay = 0,
  className = "",
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, index + 1));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <motion.h1
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      {displayedText.length < text.length && <span>|</span>}
    </motion.h1>
  );
}
