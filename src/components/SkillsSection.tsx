import {
  Atom,
  Braces,
  Brackets,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Layout,
  Palette,
  Server,
  Shapes,
  Sparkles,
  Wand2,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type SkillItem = {
  label: string;
  icon: LucideIcon;
};

export function SkillsSection() {
  const { t } = useLanguage();
  const skillGroups = [
    {
      title: t("skills.groups.frontend.title"),
      icon: Code2,
      description: t("skills.groups.frontend.description"),
      skills: [
        { label: "React", icon: Atom },
        { label: "TypeScript", icon: Braces },
        { label: "Tailwind CSS", icon: Wind },
        { label: "Vite", icon: Sparkles },
        { label: "Nextjs", icon: Layout },
        { label: "Motion UI", icon: Wand2 },
      ] satisfies SkillItem[],
    },
    {
      title: t("skills.groups.backend.title"),
      icon: Layers,
      description: t("skills.groups.backend.description"),
      skills: [
        { label: "Node.js", icon: Server },
        { label: "REST APIs", icon: Globe },
        { label: "Prisma", icon: Layers },
        { label: "PostgreSQL", icon: Database },
      ] satisfies SkillItem[],
    },
    {
      title: t("skills.groups.creative.title"),
      icon: Wand2,
      description: t("skills.groups.creative.description"),
      skills: [
        { label: "Design Systems", icon: Shapes },
        { label: "Figma", icon: Palette },
        { label: "SVG", icon: Brackets },
        { label: "Branding", icon: Sparkles },
        { label: "3D Basics", icon: Cpu },
      ] satisfies SkillItem[],
    },
    {
      title: t("skills.groups.tooling.title"),
      icon: Wrench,
      description: t("skills.groups.tooling.description"),
      skills: [
        { label: "Git", icon: Code2 },
        { label: "Storybook", icon: Layout },
        { label: "Playwright", icon: Sparkles },
        { label: "Linting", icon: Braces },
        { label: "CI/CD", icon: Wrench },
      ] satisfies SkillItem[],
    },
  ];
  const spotlight = t<Array<{ label: string; value: string }>>(
    "skills.spotlight.items",
  );
  const values = t<string[]>("skills.values.items");
  return (
    <section className="relative w-full py-24 px-4 md:px-8 overflow-hidden">
      <div className="absolute -top-24 -right-24 size-72 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-3xl rounded-full" />
      <div className="absolute -bottom-28 -left-24 size-80 bg-gradient-to-tr from-secondary/25 via-primary/10 to-transparent blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-1 bg-accent rounded-full" />
          <span className="text-accent font-semibold">{t("skills.label")}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
          {t("skills.title")}
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl">
          {t("skills.description")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="relative rounded-2xl border border-base-300/60 bg-base-100/70 backdrop-blur-xl p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="p-2 rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-xl font-semibold text-base-content">
                      {group.title}
                    </h3>
                  </div>
                  <p className="text-sm text-base-content/70 mb-4">
                    {group.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const SkillIcon = skill.icon;
                      return (
                        <span
                          key={skill.label}
                          className="px-3 py-1 rounded-full text-xs bg-base-200/80 text-base-content/80 border border-base-300/40 flex items-center gap-2"
                        >
                          <SkillIcon className="size-3 text-primary" />
                          {skill.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-base-300/60 bg-gradient-to-br from-primary/15 via-base-100/80 to-accent/10 p-6">
              <h3 className="text-xl font-semibold text-base-content mb-3">
                {t("skills.spotlight.title")}
              </h3>
              <p className="text-sm text-base-content/70 mb-6">
                {t("skills.spotlight.description")}
              </p>
              <div className="flex flex-col gap-4">
                {spotlight.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between gap-4"
                  >
                    <span className="text-xs uppercase tracking-widest text-base-content/50">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-base-content">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-base-300/60 bg-base-100/80 p-6">
              <h4 className="text-lg font-semibold text-base-content mb-3">
                {t("skills.values.title")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                  <span
                    key={value}
                    className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
