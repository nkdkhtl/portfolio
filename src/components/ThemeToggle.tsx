import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { THEMES } from "../constants/themes";
import { PaintBucket } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(
      new CustomEvent("themeChange", { detail: { theme: newTheme } }),
    );
  };

  const filteredThemes = THEMES.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        title="Change theme"
      >
        <PaintBucket className="size-6" />
      </button>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-200 rounded-box z-1 w-80 p-3 shadow max-h-96"
      >
        <input
          type="text"
          placeholder="Search themes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-sm w-full mb-3"
        />
        <ul className="menu overflow-y-auto max-h-80 flex flex-col gap-1">
          {filteredThemes.map((t) => (
            <li key={t}>
              <a
                onClick={() => handleThemeChange(t)}
                className={`flex items-center gap-3 ${theme === t ? "active" : ""}`}
              >
                <div
                  className="relative h-10 w-16 rounded-md overflow-hidden shrink-0"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="flex-1">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
                {theme === t && <Check className="size-4 shrink-0" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
