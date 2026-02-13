import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:your@email.com",
      label: "Email",
    },
  ];

  return (
    <footer className="relative w-full py-12 px-6 border-t border-base-300/30">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-lg -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-xl font-bold text-primary mb-2">Nam Khuc</h3>
            <p className="text-sm text-base-content/70">
              {t("footer.role")}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <h4 className="font-semibold text-base-content mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>
                <a
                  href="#home"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.home")}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.projects")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-end"
          >
            <h4 className="font-semibold text-base-content mb-4">
              {t("footer.connect")}
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-3 rounded-full bg-base-200/20 backdrop-blur-md border border-base-300/30 hover:bg-primary/20 hover:border-primary/30 transition-all"
                  >
                    <Icon size={20} className="text-base-content" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-base-300/50 to-transparent mb-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/60"
        >
          <p>
            &copy; {currentYear} Nam Khuc. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-1">
            {t("footer.madeWith")}
            {" "}
            <Heart size={16} className="text-error" />
            {" "}
            {t("footer.by")}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
