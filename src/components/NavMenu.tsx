import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

export function NavMenu() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      const activeIndex = navItems.findIndex(
        (item) => item.href.substring(1) === activeSection,
      );
      const activeLink = navRef.current.querySelector(
        `[data-index="${activeIndex}"]`,
      ) as HTMLElement;

      if (activeLink) {
        setIndicatorStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
        });
      }
    }
  }, [activeSection]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const section = href.substring(1);
    setActiveSection(section);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="absolute inset-0 bg-base-200/80 backdrop-blur-lg rounded-xl border border-base-300/50" />

      {/* Menu Items */}
      <div className="relative z-10 flex flex-row gap-2 items-center px-4 py-2">
        {/* Icon */}
        <img
          src="/icon.svg"
          alt="Logo"
          className="size-7 object-contain hidden md:block"
        />

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative p-1.5 text-base-content"
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Nav Items */}
        <div
          ref={navRef}
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row gap-1 absolute md:relative top-full md:top-0 left-0 md:left-auto mt-2 md:mt-0 bg-base-200/95 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none rounded-xl md:rounded-none p-3 md:p-0 border border-base-300/30 md:border-0`}
        >
          {/* Sliding background indicator */}
          <span
            className="absolute hidden md:block bg-primary rounded-full transition-all duration-300 ease-out h-[calc(100%-4px)] top-[2px]"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />

          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                data-index={index}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative z-10 px-3 py-1.5 text-xs font-semibold rounded-full transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-primary-content"
                    : "text-base-content/70 hover:text-base-content"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
