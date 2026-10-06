import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { config } from "./config/index.js";
import apiRoutes from "./routes/api.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.port;
const isProduction = config.isProduction;

const frontendDir = path.resolve(__dirname, "../../frontend");
const distDir = path.resolve(frontendDir, "dist");

// Standard middleware
app.use(cors());
app.use(express.json());

// API routes MUST be processed first
app.use("/api", apiRoutes);

// Unknown /api/* routes return JSON 404, never the SPA HTML
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

async function start() {
  if (!isProduction) {
    // Development mode: Vite middleware attached to Express
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      root: frontendDir,
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built frontend from frontend/dist
    if (!fs.existsSync(distDir)) {
      console.warn(`Warning: frontend/dist does not exist. Please run 'npm run build' first.`);
    }

    app.use(express.static(distDir));

    // SPA fallback: Send index.html for all non-API GET requests
    app.get("*", (req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  // Error handler middleware
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`Portfolio Server Running`);
    console.log(`Mode:        ${isProduction ? "PRODUCTION" : "DEVELOPMENT"}`);
    console.log(`Port:        ${PORT}`);
    console.log(`Local URL:   http://localhost:${PORT}`);
    console.log(`API Health:  http://localhost:${PORT}/api/health`);
    console.log(`==================================================\n`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
