import { existsSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Ensure the production build exists (especially if Render only ran 'npm install')
const distServerPath = path.join(__dirname, "dist", "server.cjs");
const distHtmlPath = path.join(__dirname, "dist", "index.html");

if (!existsSync(distServerPath) || !existsSync(distHtmlPath)) {
  console.log("Building production assets with vite & esbuild...");
  try {
    execSync("npm run build", { stdio: "inherit", cwd: __dirname });
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

// Start the bundled production server
console.log("Launching Sahakar Seva production server...");
process.env.NODE_ENV = "production";
require(distServerPath);
