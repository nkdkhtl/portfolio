import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}
export function Terminal() {
  const { t, language } = useLanguage();
  const buildOutputLines = (contents: string[]) =>
    contents.map((content) => ({ type: "output" as const, content }));
  const [lines, setLines] = useState<TerminalLine[]>([
    ...buildOutputLines(t<string[]>("terminal.initialLines")),
  ]);

  const [currInp, setCurrInp] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => string | string[]> = {
    help: () => t<string[]>("terminal.help"),
    about: () => t<string[]>("terminal.about"),
    skills: () => t<string[]>("terminal.skills"),
    projects: () => t<string[]>("terminal.projects"),
    contact: () => t<string[]>("terminal.contact"),
    socials: () => t<string[]>("terminal.socials"),
    resume: () => t<string[]>("terminal.resume"),
    clear: () => {
      setLines([]);
      return "";
    },
    date: () => new Date().toLocaleString(),
  };

  const handleCommand = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setLines((prev) => [...prev, { type: "input", content: `$ ${trimmed}` }]);
    setCommandHistory((prev) => [...prev, trimmed]);

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command == "echo") {
      setLines((prev) => [
        ...prev,
        { type: "output", content: args.join(" ") || "" },
      ]);
    } else if (commands[command]) {
      const res = commands[command]();
      if (Array.isArray(res)) {
        setLines((prev) => [
          ...prev,
          ...res.map((line) => ({ type: "output" as const, content: line })),
        ]);
      } else if (res) {
        setLines((prev) => [...prev, { type: "output", content: res }]);
      }
    } else {
      setLines((prev) => [
        ...prev,
        {
          type: "error",
          content: t("terminal.commandNotFound").replace("{command}", command),
        },
      ]);
    }

    setLines((prev) => [...prev, { type: "output", content: "" }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currInp);
      setCurrInp("");
      setHistoryIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIdx =
          historyIdx === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setCurrInp(commandHistory[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const newIdx = historyIdx + 1;
        if (newIdx >= commandHistory.length) {
          setHistoryIdx(-1);
          setCurrInp("");
        } else {
          setHistoryIdx(newIdx);
          setCurrInp(commandHistory[newIdx]);
        }
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    setLines(buildOutputLines(t<string[]>("terminal.initialLines")));
  }, [language, t]);
  return (
    <div
      className="bg-base-200 backdrop-blur-sm rounded-2xl border border-base-300 p-6 shadow-2xl h-125 flex flex-col font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-base-300">
        <div className="w-3 h-3 rounded-full bg-error/70"></div>
        <div className="w-3 h-3 rounded-full bg-warning/70"></div>
        <div className="w-3 h-3 rounded-full bg-success/70"></div>
        <span className="ml-3 text-base-content/60 text-sm">nk-terminal</span>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent mb-3"
      >
        {lines.map((line, index) => (
          <motion.div
            key={index}
            className="mb-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            {line.type === "input" && (
              <span className="text-info">{line.content}</span>
            )}
            {line.type === "output" && (
              <span className="text-base-content/80">{line.content}</span>
            )}
            {line.type === "error" && (
              <span className="text-error/80">{line.content}</span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-base-content">
        <span className="text-info">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currInp}
          onChange={(e) => setCurrInp(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-base-content placeholder-base-content/30 caret-primary"
          placeholder={t("terminal.placeholder")}
        />
      </div>
    </div>
  );
}
