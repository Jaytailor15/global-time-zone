import { Github } from "lucide-react";

const GitHubIcon = () => {
  return (
    <a
      href="https://github.com/Jaytailor15/global-time-zone"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 bg-card/80 p-2 rounded-full border border-gray-400 hover:bg-card-hover transition-colors duration-200"
      aria-label="View on GitHub"
      title="View on GitHub"
    >
      <Github className="w-6 h-6 text-white/90 hover:text-white transition-colors duration-200" />
    </a>
  );
};

export default GitHubIcon; 