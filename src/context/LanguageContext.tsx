import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Language = "en" | "vi";

type TranslationValue = string | TranslationValue[] | Record<string, TranslationValue>;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: <T = string>(key: string) => T;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const translations: Record<Language, Record<string, TranslationValue>> = {
  en: {
    app: {
      role: "Frontend Web Intern",
      tagline: "Crafting beautiful digital experiences with code and creativity",
      availability: "available for work",
      building: "building cool stuff",
    },
    actionMenu: {
      music: "Music",
      effects: "Effects",
      menu: "Menu",
      language: "Language",
    },
    themeToggle: {
      change: "Change theme",
      search: "Search themes...",
    },
    nav: {
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    quickLinks: {
      resume: "Resume",
    },
    projects: {
      featuredLabel: "FEATURED WORKS",
      title: "Projects & Creations",
      description:
        "A collection of projects I've built to solve real problems and explore new technologies. Each one is a learning journey.",
      loading: "Loading projects from GitHub...",
      error:
        "Could not load projects: {error}. Please check your GitHub username in the component settings.",
      featuredTitle: "Featured Projects",
      otherTitle: "Other Projects",
      empty: "No projects found. Please check your GitHub username.",
      viewAll: "View All Projects on GitHub",
    },
    skills: {
      label: "SKILLSET",
      title: "Tools, tastes, and tech",
      description:
        "A balanced mix of engineering, design, and experimentation. I aim for fast iteration without sacrificing craft.",
      groups: {
        frontend: {
          title: "Frontend",
          description: "Interfaces that feel alive and clear.",
        },
        backend: {
          title: "Backend",
          description: "APIs and data that scale with the product.",
        },
        creative: {
          title: "Creative",
          description: "Visual polish, interaction, and style systems.",
        },
        tooling: {
          title: "Tooling",
          description: "Quality, velocity, and smooth handoffs.",
        },
      },
      spotlight: {
        title: "Skill spotlight",
        description: "Focused areas where I push the most energy right now.",
        items: [
          { label: "Currently exploring", value: "WebGL + shaders" },
          { label: "Stack preference", value: "React + Tailwind" },
          { label: "Design vibe", value: "Bold, luminous, clean" },
        ],
      },
      values: {
        title: "What I value",
        items: [
          "Delightful UX",
          "Readable code",
          "Collaboration",
          "Performance",
          "Consistency",
        ],
      },
    },
    contact: {
      label: "CONTACT",
      title: "Let's build something bright",
      description:
        "Tell me about your idea, collaboration, or internship opportunity. I usually reply within 24 hours.",
      cardTitle: "Start a conversation",
      cardDescription:
        "The fastest way to reach me is email. I'm also open to quick calls if needed.",
      emailCta: "Email me",
      githubCta: "View GitHub",
    },
    footer: {
      role: "Frontend Web Developer & Creative Coder",
      quickLinks: "Quick Links",
      home: "Home",
      projects: "Projects",
      contact: "Contact",
      connect: "Connect",
      rights: "All rights reserved.",
      madeWith: "Made with",
      by: "by Nam Khuc",
    },
    music: {
      title: "NK's Radio",
      nowPlaying: "Now playing...",
      pause: "Pause",
      play: "Play",
    },
    terminal: {
      initialLines: [
        "Welcome to nk's terminal",
        'Type "help" to explore or "about" to learn more about me',
        "",
      ],
      help: [
        "Available commands:",
        "  help       - Show this help message",
        "  about      - Learn about me",
        "  skills     - View my skills",
        "  projects   - See my recent projects",
        "  contact    - Get my contact info",
        "  socials    - View my social links",
        "  resume     - Download my resume",
        "  clear      - Clear the terminal",
        "  date       - Show current date and time",
      ],
      about: [
        "Hi, I'm Khuc Phuong Nam (Nam Khuc)",
        "",
        "3rd-year IT Student at ",
        "the University of Transport and Communications.",
        "",
        "Vice Head of the Web Division at SFIT Computer Club.",
        "",
        "Passionate about modern web technologies, ",
        "design systems, and user-centered development.",
        "",
        "Based in Dong Anh, Ha Noi",
        "Open to Internship opportunities!",
      ],
      skills: [
        "🛠️ Technical Skills:",
        "",
        "  Frontend:",
        "    → React, TypeScript, Next.js",
        "    → Tailwind CSS, Motion, Boostraps",
        "    → HTML5, CSS3, JavaScript",
        "",
        "  Backend:",
        "    → Node.js, Express, Golang",
        "    → Python,",
        "    → REST APIs, WebSocket",
        "",
        "  Tools & More:",
        "    → Git, GitHub, VS Code",
        "    → Cursor, Vibe Coding,...",
        "    → Docker, CI/CD",
      ],
      projects: [
        "🚀 Recent Projects:",
        "",
        "  1. E-commerce Platform",
        "     Next.js + Stripe integration",
        "     → github.com/yourusername/ecommerce",
        "",
        "  2. Task Management App",
        "     React + Firebase real-time sync",
        "     → github.com/yourusername/taskapp",
        "",
        "  3. Portfolio Website",
        "     Custom design with animations",
        "     → github.com/yourusername/portfolio",
        "",
        "View all projects: github.com/yourusername",
      ],
      contact: [
        "📬 Get in touch:",
        "",
        "  Email: khucphuongnam2005@gmail.com",
        "  Location: Dong Anh, Ha Noi, Viet Nam",
        "",
        "Feel free to reach out for collaborations!",
      ],
      socials: [
        "🌐 Find me online:",
        "",
        "  GitHub:   github.com/nkdkhtl",
        "  LinkedIn: linkedin.com/in/namkhuc",
        "  Instagram: instagram.com/nam.khuc242",
        "  Facebook: facebook.com/nkdkhtl",
        "  Portfolio: namkhuc.me",
      ],
      resume: [
        "📄 Resume:",
        "",
        "Download: namkhuc.me/resume.pdf",
        "",
        "(In a real implementation, this would trigger a download)",
      ],
      placeholder: "type a command...",
      commandNotFound:
        'Command not found: {command}. Type "help" for available commands',
    },
  },
  vi: {
    app: {
      role: "Thực tập sinh Frontend",
      tagline:
        "Tạo ra trải nghiệm số đẹp bằng code và sự sáng tạo",
      availability: "sẵn sàng nhận việc",
      building: "đang làm đồ hay",
    },
    actionMenu: {
      music: "Nhạc",
      effects: "Hiệu ứng",
      menu: "Menu",
      language: "Ngôn ngữ",
    },
    themeToggle: {
      change: "Đổi giao diện",
      search: "Tìm theme...",
    },
    nav: {
      about: "Giới thiệu",
      projects: "Dự án",
      skills: "Kỹ năng",
      contact: "Liên hệ",
    },
    quickLinks: {
      resume: "CV",
    },
    projects: {
      featuredLabel: "DỰ ÁN NỔI BẬT",
      title: "Dự án & sáng tạo",
      description:
        "Bộ sưu tập các dự án mình xây dựng để giải quyết vấn đề thật và khám phá công nghệ mới. Mỗi dự án là một hành trình học hỏi.",
      loading: "Đang tải dự án từ GitHub...",
      error:
        "Không thể tải dự án: {error}. Vui lòng kiểm tra tên GitHub trong phần cài đặt thành phần.",
      featuredTitle: "Dự án nổi bật",
      otherTitle: "Dự án khác",
      empty: "Không tìm thấy dự án. Vui lòng kiểm tra tên GitHub.",
      viewAll: "Xem tất cả dự án trên GitHub",
    },
    skills: {
      label: "KỸ NĂNG",
      title: "Công cụ, gu, và công nghệ",
      description:
        "Sự cân bằng giữa kỹ thuật, thiết kế và thử nghiệm. Mình hướng tới tốc độ mà không bỏ qua chất lượng.",
      groups: {
        frontend: {
          title: "Frontend",
          description: "Giao diện sống động và rõ ràng.",
        },
        backend: {
          title: "Backend",
          description: "API và dữ liệu mở rộng theo sản phẩm.",
        },
        creative: {
          title: "Sáng tạo",
          description: "Hoàn thiện thị giác, tương tác và hệ thống style.",
        },
        tooling: {
          title: "Công cụ",
          description: "Chất lượng, tốc độ và phối hợp mượt mà.",
        },
      },
      spotlight: {
        title: "Điểm nhấn kỹ năng",
        description: "Những lĩnh vực mình đang tập trung nhất.",
        items: [
          { label: "Đang tìm hiểu", value: "WebGL + shader" },
          { label: "Ưu tiên stack", value: "React + Tailwind" },
          { label: "Phong cách thiết kế", value: "Đậm nét, sáng, gọn" },
        ],
      },
      values: {
        title: "Điều mình coi trọng",
        items: [
          "UX cuốn hút",
          "Code dễ đọc",
          "Hợp tác",
          "Hiệu năng",
          "Nhất quán",
        ],
      },
    },
    contact: {
      label: "LIÊN HỆ",
      title: "Cùng tạo nên điều thật sáng",
      description:
        "Hãy cho mình biết ý tưởng, dự án hợp tác hoặc cơ hội thực tập. Mình thường phản hồi trong 24 giờ.",
      cardTitle: "Bắt đầu trò chuyện",
      cardDescription:
        "Email là cách nhanh nhất để liên hệ. Mình cũng sẵn sàng call nhanh khi cần.",
      emailCta: "Gửi email",
      githubCta: "Xem GitHub",
    },
    footer: {
      role: "Lập trình viên Frontend & Nhà sáng tạo",
      quickLinks: "Liên kết nhanh",
      home: "Trang chủ",
      projects: "Dự án",
      contact: "Liên hệ",
      connect: "Kết nối",
      rights: "Bảo lưu mọi quyền.",
      madeWith: "Làm với",
      by: "bởi Nam Khuc",
    },
    music: {
      title: "Radio của NK",
      nowPlaying: "Đang phát...",
      pause: "Tạm dừng",
      play: "Phát",
    },
    terminal: {
      initialLines: [
        "Chào mừng đến terminal của nk",
        'Gõ "help" để khám phá hoặc "about" để tìm hiểu thêm',
        "",
      ],
      help: [
        "Các lệnh có sẵn:",
        "  help       - Hiện hướng dẫn",
        "  about      - Giới thiệu về mình",
        "  skills     - Xem kỹ năng",
        "  projects   - Xem dự án gần đây",
        "  contact    - Lấy thông tin liên hệ",
        "  socials    - Xem mạng xã hội",
        "  resume     - Tải CV",
        "  clear      - Xóa terminal",
        "  date       - Hiện ngày giờ hiện tại",
      ],
      about: [
        "Chào, mình là Khúc Phương Nam (Nam Khúc)",
        "",
        "Sinh viên CNTT năm 3 tại",
        "Trường Đại học Giao thông Vận tải.",
        "",
        "Phó ban Web của Câu lạc bộ SFIT.",
        "",
        "Đam mê công nghệ web hiện đại,",
        "hệ thống thiết kế và phát triển lấy người dùng làm trung tâm.",
        "",
        "Sống tại Đông Anh, Hà Nội",
        "Sẵn sàng cho cơ hội thực tập!",
      ],
      skills: [
        "🛠️ Kỹ năng kỹ thuật:",
        "",
        "  Frontend:",
        "    → React, TypeScript, Next.js",
        "    → Tailwind CSS, Motion, Boostraps",
        "    → HTML5, CSS3, JavaScript",
        "",
        "  Backend:",
        "    → Node.js, Express, Golang",
        "    → Python,",
        "    → REST APIs, WebSocket",
        "",
        "  Công cụ & khác:",
        "    → Git, GitHub, VS Code",
        "    → Cursor, Vibe Coding,...",
        "    → Docker, CI/CD",
      ],
      projects: [
        "🚀 Dự án gần đây:",
        "",
        "  1. Nền tảng thương mại điện tử",
        "     Next.js + Stripe integration",
        "     → github.com/yourusername/ecommerce",
        "",
        "  2. Ứng dụng quản lý công việc",
        "     React + Firebase real-time sync",
        "     → github.com/yourusername/taskapp",
        "",
        "  3. Website Portfolio",
        "     Thiết kế riêng với animation",
        "     → github.com/yourusername/portfolio",
        "",
        "Xem tất cả dự án: github.com/yourusername",
      ],
      contact: [
        "📬 Liên hệ:",
        "",
        "  Email: khucphuongnam2005@gmail.com",
        "  Địa điểm: Đông Anh, Hà Nội, Việt Nam",
        "",
        "Cứ thoải mái liên hệ để hợp tác!",
      ],
      socials: [
        "🌐 Tìm mình trên mạng:",
        "",
        "  GitHub:   github.com/nkdkhtl",
        "  LinkedIn: linkedin.com/in/namkhuc",
        "  Instagram: instagram.com/nam.khuc242",
        "  Facebook: facebook.com/nkdkhtl",
        "  Portfolio: namkhuc.me",
      ],
      resume: [
        "📄 CV:",
        "",
        "Tải: namkhuc.me/resume.pdf",
        "",
        "(Trong bản thật, thao tác này sẽ tải file)",
      ],
      placeholder: "nhập lệnh...",
      commandNotFound:
        'Không tìm thấy lệnh: {command}. Gõ "help" để xem danh sách',
    },
  },
};

const getNestedValue = (source: Record<string, TranslationValue>, key: string) =>
  key
    .split(".")
    .reduce<TranslationValue | undefined>(
      (acc, part) =>
        acc && typeof acc === "object" && part in acc
          ? (acc as Record<string, TranslationValue>)[part]
          : undefined,
      source,
    );

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "en" || savedLanguage === "vi") {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
  };

  const t = useMemo(() => {
    return <T = string>(key: string): T => {
      const value = getNestedValue(translations[language], key);
      return (value ?? key) as T;
    };
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage: handleSetLanguage, t }),
    [language, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
