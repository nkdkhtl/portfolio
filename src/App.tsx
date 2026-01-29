import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import namkhuc from "./assets/0c4b6f786fdce50db18a9523b7ccf920.jpg";
import { Terminal } from "./components/Terminal";
import { QuickLinks } from "./components/QuickLinks";
import { TypingText } from "./components/TypingText";
import { ActionMenu } from "./components/ActionMenu";
import { RainSnowEffect } from "./components/RainSnowEffect";
import { MusicPlayer } from "./components/MusicPlayer";

function App() {
  const [theme, setTheme] = useState("dark");
  const [effectType, setEffectType] = useState<"rain" | "snow" | null>(null);
  const [showMusic, setShowMusic] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: string }>;
      setTheme(customEvent.detail.theme);
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  const handleSparkles = () => {
    if (effectType === null) {
      setEffectType("snow");
    } else {
      setEffectType(null);
    }
  };

  return (
    <div data-theme={theme} className="min-h-screen relative overflow-hidden ">
      <div className="fixed z-100 pointer-events-auto">
        <RainSnowEffect isActive={effectType !== null} />

        <ActionMenu
          onMusicClick={() => setShowMusic(!showMusic)}
          onSparklesClick={handleSparkles}
          isMusicActive={showMusic}
          isSparklesActive={effectType !== null}
        />
      </div>

      <MusicPlayer isOpen={showMusic} onClose={() => setShowMusic(false)} />
      {/* Main Content */}
      <div className="flex flex-col justify-center items-center px-4 py-12">
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-4 border-8 border-primary rounded-full p-1 relative animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.9)]">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={namkhuc}
                alt=""
                className="w-full h-full object-top object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <TypingText
            text="[Khúc Phương Nam]"
            delay={300}
            className="text-4xl md:text-6xl font-bold mb-3 text-primary"
          />
          <p className="text-center text-sm md:text-md mb-2 text-secondary">
            ~namkhuc~
          </p>
          <TypingText
            text="Frontend Web Intern"
            delay={800}
            className="text-center text-xl md:text-2xl mb-2 block text-accent"
          />
        </div>
        <p className="text-base md:text-lg max-w-2xl mx-auto text-base-content/80">
          Crafting beautiful digital experiences with code and creativity
        </p>
        <div className="flex items-center justify-center gap-6 text-sm my-3">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-success animate-pulse"></span>
            available for work
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Rocket className="size-3" />
            building cool stuff
          </span>
        </div>
        {/* Quick Links */}
        <div className="mb-8 w-full max-w-4xl">
          <QuickLinks />
        </div>

        {/* Terminal Container */}
        <div className="w-full max-w-4xl">
          <Terminal />
        </div>
      </div>
    </div>
  );
}

export default App;
