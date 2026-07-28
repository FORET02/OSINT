import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

const pagesRoot = fileURLToPath(new URL(".", import.meta.url));
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/").at(-1) ?? "osint";
const basePath =
  process.env.GITHUB_ACTIONS === "true" ? `/${repositoryName}/` : "/osint/";

export default defineConfig({
  root: pagesRoot,
  base: basePath,
  publicDir: fileURLToPath(new URL("../public", import.meta.url)),
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL("../pages-dist", import.meta.url)),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
  },
});
