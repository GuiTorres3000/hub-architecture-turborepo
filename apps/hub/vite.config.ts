import { defineConfig } from "vite";
import { createViteBaseConfig } from "@app/config/vite.base";

export default defineConfig(
  createViteBaseConfig({ port: 3000, rootDir: import.meta.dirname }),
);
