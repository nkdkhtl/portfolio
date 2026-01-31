interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  homepage?: string;
  language?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  live?: string;
  stats?: {
    stars?: number;
    forks?: number;
  };
}

// Configuration - Only need GitHub username and token
const GITHUB_USERNAME = import.meta.env.VITE_PORTFOLIO_GITHUB_USERNAME;
const GITHUB_TOKEN = import.meta.env.VITE_PORTFOLIO_GITHUB_TOKEN;

// Helper: Get emoji for language
const getEmojiForLanguage = (language?: string): string => {
  const emojiMap: { [key: string]: string } = {
    TypeScript: "📘",
    React: "⚛️",
    "C#": "🔷",
    Python: "🐍",
    JavaScript: "⚙️",
    Go: "🐹",
    Java: "☕",
    Rust: "🦀",
    CSS: "🎨",
    HTML: "🌐",
  };
  return emojiMap[language || ""] || "📦";
};

// Helper: Convert repository name to readable title
const convertRepoNameToTitle = (name: string): string => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Helper: Convert GitHub repo to Project format
const convertGitHubRepoToProject = (repo: GitHubRepo): Project => {
  const tags = repo.topics.length > 0 ? repo.topics : [repo.language || "Code"];

  return {
    id: repo.id,
    title: convertRepoNameToTitle(repo.name),
    description: repo.description || "No description provided",
    tags: tags,
    image: getEmojiForLanguage(repo.language),
    github: repo.html_url,
    live: repo.homepage || undefined,
    stats: {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    },
  };
};

// Main function: Fetch GitHub repositories
export const fetchGitHubProjects = async (): Promise<Project[]> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add token if available for higher rate limits (5000 requests/hour instead of 60)
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&order=desc&per_page=100`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out hidden repos
    const filteredRepos = repos.filter((repo) => !repo.name.startsWith("."));

    // Convert to projects format
    const projects = filteredRepos.map(convertGitHubRepoToProject);

    return projects;
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    throw error;
  }
};

// Utility: Get GitHub user profile
export const fetchGitHubUser = async () => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (GITHUB_TOKEN) {
      headers["Authorization"] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    throw error;
  }
};
