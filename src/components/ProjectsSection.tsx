import { Github, ExternalLink, Star, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchGitHubProjects, type Project } from "../services";

export const ProjectsSection = () => {
  // Removed unused hoveredId state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchGitHubProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Error loading projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch projects",
        );
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="w-full py-20 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-1 bg-primary rounded-full"></div>
          <span className="text-primary font-semibold">FEATURED WORKS</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
          Projects & Creations
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl">
          A collection of projects I've built to solve real problems and explore
          new technologies. Each one is a learning journey.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20">
          <Loader className="size-12 text-primary animate-spin mb-4" />
          <p className="text-base-content/70">
            Loading projects from GitHub...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-7xl mx-auto mb-16 p-4 rounded-lg bg-error/10 border border-error/30">
          <p className="text-error">
            Could not load projects: {error}. Please check your GitHub username
            in the component settings.
          </p>
        </div>
      )}

      {/* Content */}
      {!loading && projects.length > 0 && (
        <div className="max-w-7xl mx-auto">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                // Removed hoveredId-related logic
                className="group relative h-80 rounded-xl overflow-hidden cursor-pointer"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-base-200 to-base-300 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></div>

                {/* Border */}
                <div className="absolute inset-0 border border-base-300 group-hover:border-primary/50 rounded-xl transition-all duration-300 pointer-events-none"></div>

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                  <div>
                    <div className="text-5xl mb-3">{project.image}</div>
                    <h4 className="text-lg md:text-xl font-bold text-base-content mb-2">
                      {project.title}
                    </h4>
                    <p className="text-sm text-base-content/70 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-base-300 text-base-content group-hover:bg-primary/20 group-hover:text-primary transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-base-300 text-base-content">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Stats & Links */}
                    <div className="flex items-center justify-between gap-2">
                      {project.stats && (
                        <div className="flex items-center gap-1 text-xs text-base-content/60">
                          <Star className="size-3" />
                          {project.stats.stars}
                        </div>
                      )}
                      <div className="flex gap-1">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-primary/20 hover:bg-primary/40 text-primary transition-colors"
                          >
                            <Github className="size-4" />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-accent/20 hover:bg-accent/40 text-accent transition-colors"
                          >
                            <ExternalLink className="size-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Projects State */}
      {!loading && projects.length === 0 && !error && (
        <div className="max-w-7xl mx-auto py-20 text-center">
          <p className="text-base-content/70 text-lg">
            No projects found. Please check your GitHub username.
          </p>
        </div>
      )}

      {/* CTA Button */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105">
          View All Projects on GitHub
        </button>
      </div>
    </div>
  );
};
