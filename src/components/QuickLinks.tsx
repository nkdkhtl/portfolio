import { Facebook, FileText, Github, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function QuickLinks() {
  const { t } = useLanguage();
  const links = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/nkdkhtl",
      color: "hover:text-[#d4b5d4]",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/namkhuc",
      color: "hover:text-[#b4c4d4]",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/nam.khuc242",
      color: "hover:text-[#d4c4b4]",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com/nkdkhtl",
      color: "hover:text-[#d4b5d4]",
    },
    {
      icon: FileText,
      label: t("quickLinks.resume"),
      href: "/resume.pdf",
      color: "hover:text-[#b4c4d4]",
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          rel="noopener noreferrer"
          target="_blank"
          className={`btn flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-lg ${link.color}`}
        >
          <link.icon className="w-4 h-4" />
          <span className="text-sm">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
