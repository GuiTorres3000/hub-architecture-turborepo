import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";

export interface ViteBaseOptions {
  /** Dev server port — unique per app. */
  port: number;
  /** Absolute path to the app root (use __dirname / import.meta.dirname). */
  rootDir: string;
}

/**
 * Shared Vite configuration for every App React app.
 * Apps call this with their port + root and may shallow-merge overrides.
 */
export function createViteBaseConfig({ port, rootDir }: ViteBaseOptions): UserConfig {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(rootDir, "./src"),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    server: {
      port,
      strictPort: true,
    },
    preview: {
      port,
      strictPort: true,
    },
    build: {
      outDir: "dist",
      sourcemap: true,
      target: "es2022",
    },
  };
}
