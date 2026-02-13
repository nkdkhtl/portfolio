import { useLanguage } from "../context/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === "en" ? "vi" : "en");
  };

  return (
    <button
      onClick={handleToggle}
      className="btn btn-ghost btn-circle btn-sm"
      title={t("actionMenu.language")}
    >
      <span className="text-xs font-semibold">
        {language === "en" ? "EN" : "VI"}
      </span>
    </button>
  );
}
