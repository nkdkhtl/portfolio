# 🚀 Nam Khuc's Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Nam%20Khuc-blue?style=for-the-badge&logo=react)
[![TypeScript](https://img.shields.io/badge/TypeScript-97.8%25-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

**A modern, interactive portfolio website showcasing projects and skills**

[Live Demo](https://namkhuc.me) • [View Projects](#-features) • [Contact](mailto:khucphuongnam2005@gmail.com)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Customization](#-customization)
- [Contact](#-contact)
- [License](#-license)

---

## 🎯 About

This is a personal portfolio website built with modern web technologies, featuring:

- **Interactive Terminal Interface** - Command-line style navigation
- **Dynamic Theme System** - Multiple theme options with smooth transitions
- **Visual Effects** - Rain and snow effects for enhanced user experience
- **Music Player Integration** - Built-in music player
- **GitHub Integration** - Automatically fetch and display GitHub projects
- **Responsive Design** - Optimized for all screen sizes
- **Smooth Animations** - Powered by Motion (Framer Motion fork)

**About Me:**
- 🎓 3rd-year IT Student at the University of Transport and Communications
- 💼 Frontend Web Intern
- 📍 Based in Dong Anh, Ha Noi, Vietnam
- 🌱 Passionate about modern web technologies and user-centered development

---

## ✨ Features

### 🖥️ Interactive Terminal
- Full-featured terminal emulator in the browser
- Multiple commands: `help`, `about`, `skills`, `projects`, `contact`, `socials`, `resume`, `clear`, `date`
- Command history navigation with arrow keys
- Auto-focus and click-to-focus functionality

### 🎨 Theme System
- Multiple pre-built themes powered by DaisyUI
- Real-time theme switching with localStorage persistence
- Smooth theme transitions
- Custom color schemes

### 🎵 Music Player
- Integrated audio player
- Minimalist, floating UI design
- Toggle on/off from action menu

### ⚡ Visual Effects
- Rain and snow particle effects
- Toggle effects from action menu
- Smooth animations and transitions

### 📱 Responsive Navigation
- Sticky navigation menu
- Active section highlighting
- Smooth scroll to sections
- Mobile-friendly hamburger menu

### 🔗 GitHub Integration
- Automatically fetch repositories using GitHub API
- Display project cards with:
  - Project name and description
  - Primary language with emoji indicators
  - Star count and repository links
  - Automatic emoji mapping for languages

---

## 🛠️ Tech Stack

### Frontend Framework & Libraries
- **React 19.2.0** - UI library
- **TypeScript** - Type-safe JavaScript (97.8% of codebase)
- **Vite 7.2.4** - Build tool and dev server

### Styling & UI
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **DaisyUI 5.5.14** - Component library for Tailwind
- **Motion 12.29.2** - Animation library (Framer Motion fork)
- **Lucide React** - Icon library

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript linting
- **Vite React Plugin** - Fast refresh and optimization

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nkdkhtl/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your configuration:
   ```env
   VITE_PORTFOLIO_GITHUB_USERNAME=your_github_username
   VITE_PORTFOLIO_GITHUB_TOKEN=your_github_token
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and media files
│   ├── components/      # React components
│   │   ├── ActionMenu.tsx
│   │   ├── Footer.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── NavMenu.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── QuickLinks.tsx
│   │   ├── RainSnowEffect.tsx
│   │   ├── Terminal.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── TypingText.tsx
│   ├── constants/       # Constants and configuration
│   │   └── themes.ts
│   ├── services/        # API services
│   │   ├── github.ts    # GitHub API integration
│   │   └── index.ts
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── .gitignore
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tsconfig.app.json    # App-specific TS config
├── tsconfig.node.json   # Node-specific TS config
└── vite.config.ts       # Vite configuration
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# GitHub Integration (Required for projects section)
VITE_PORTFOLIO_GITHUB_USERNAME=your_github_username
VITE_PORTFOLIO_GITHUB_TOKEN=your_github_personal_access_token
```

### How to Get GitHub Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name
4. Select scopes: `public_repo` (for public repositories)
5. Generate and copy the token
6. Paste it in your `.env` file

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint to check code quality |

---

## 🎨 Customization

### Adding New Themes

Themes are managed in `src/constants/themes.ts`. You can add new DaisyUI themes:

```typescript
export const THEMES = [
  "light",
  "dark",
  "cupcake",
  "cyberpunk",
  // Add your custom theme here
];
```

### Modifying Terminal Commands

Edit `src/components/Terminal.tsx` and add new commands to the `commands` object:

```typescript
const commands: Record<string, () => string | string[]> = {
  // ... existing commands
  yourcommand: () => [
    "Your command output",
    "Line 2",
    "Line 3",
  ],
};
```

### Updating Personal Information

1. **Profile Image**: Replace the image in `src/assets/`
2. **Personal Details**: Edit the terminal commands in `Terminal.tsx`
3. **Contact Info**: Update `contact` and `socials` commands
4. **Skills**: Modify the `skills` command output

### GitHub Project Display

The portfolio automatically fetches your GitHub repositories. To customize which repos are shown, modify `src/services/github.ts`:

```typescript
// Filter or sort repositories as needed
const filteredRepos = repos.filter(repo => !repo.fork); // Example: hide forks
```

---

## 📞 Contact

**Nam Khuc (Khúc Phương Nam)**

- 📧 Email: [khucphuongnam2005@gmail.com](mailto:khucphuongnam2005@gmail.com)
- 🐙 GitHub: [@nkdkhtl](https://github.com/nkdkhtl)
- 💼 LinkedIn: [linkedin.com/in/namkhuc](https://linkedin.com/in/namkhuc)
- 📷 Instagram: [@nam.khuc242](https://instagram.com/nam.khuc242)
- 📘 Facebook: [facebook.com/nkdkhtl](https://facebook.com/nkdkhtl)
- 🌐 Website: [namkhuc.me](https://namkhuc.me)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [DaisyUI](https://daisyui.com/) - Component library
- [Motion](https://motion.dev/) - Animation library
- [Lucide](https://lucide.dev/) - Icon set

---

<div align="center">

**Made with ❤️ by Nam Khuc**

[![GitHub Stars](https://img.shields.io/github/stars/nkdkhtl/portfolio?style=social)](https://github.com/nkdkhtl/portfolio)
[![GitHub Forks](https://img.shields.io/github/forks/nkdkhtl/portfolio?style=social)](https://github.com/nkdkhtl/portfolio)

</div>
