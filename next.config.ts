import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryBasePath = "/Lamera_Racetrack";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? repositoryBasePath : undefined,
  assetPrefix: isGitHubPages ? `${repositoryBasePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: isGitHubPages,
  },
};

export default nextConfig;
