import {
  ArrowUpRight,
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const contactCards = [
  {
    title: "GitHub",
    value: "github.com/nkdkhtl",
    href: "https://github.com/nkdkhtl",
    icon: Github,
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/namkhuc",
    href: "https://linkedin.com/in/namkhuc",
    icon: Linkedin,
  },
  {
    title: "Instagram",
    value: "instagram.com/nam.khuc242",
    href: "https://instagram.com/nam.khuc242",
    icon: Instagram,
  },
  {
    title: "Facebook",
    value: "facebook.com/nkdkhtl",
    href: "https://facebook.com/nkdkhtl",
    icon: Facebook,
  },
  {
    title: "Portfolio",
    value: "namkhuc.me",
    href: "https://namkhuc.me",
    icon: Globe,
  },
];

export function ContactSection() {
  const { t } = useLanguage();
  return (
    <section className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-1 bg-primary rounded-full" />
          <span className="text-primary font-semibold">
            {t("contact.label")}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
          {t("contact.title")}
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl">
          {t("contact.description")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          <div className="lg:col-span-2 rounded-2xl border border-base-300/60 bg-base-100/80 backdrop-blur-xl p-8">
            <h3 className="text-2xl font-semibold text-base-content mb-3">
              {t("contact.cardTitle")}
            </h3>
            <p className="text-sm text-base-content/70 mb-6">
              {t("contact.cardDescription")}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="mailto:namkhuc.dev@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all"
              >
                {t("contact.emailCta")}
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href="https://github.com/nkdkhtl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-base-300/70 text-base-content hover:border-primary/60 hover:text-primary transition-colors"
              >
                {t("contact.githubCta")}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-base-300/60 bg-base-100/70 backdrop-blur-xl p-5 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-base-content/50">
                        {card.title}
                      </p>
                      <p className="text-sm font-semibold text-base-content">
                        {card.value}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
