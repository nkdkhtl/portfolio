import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  swayAmount: number;
}

interface RainSnowEffectProps {
  isActive: boolean;
}

export function RainSnowEffect({ isActive }: RainSnowEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 5 + Math.random() * 3,
      size: Math.random() * 8 + 6,
      opacity: Math.random() * 0.5 + 0.3,
      swayAmount: Math.random() * 20 + 10,
    }));

    setParticles(newParticles);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white shadow-lg"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: "blur(0.5px) drop-shadow(0 0 2px rgba(255,255,255,0.5))",
          }}
          initial={{ y: -100, opacity: 0, x: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, particle.opacity, particle.opacity, 0],
            x: Math.sin(particle.id) * particle.swayAmount,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
