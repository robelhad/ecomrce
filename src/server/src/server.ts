import { addAlias } from "module-alias";
import path from "path";
//import express from "express";
// Dynamically set module alias based on NODE_ENV
const isProduction = process.env.NODE_ENV === "production";

const projectRoot = path.resolve(__dirname, ".."); // Move up from src to project root

const aliasPath = path.join(projectRoot, isProduction ? "dist" : "src");

addAlias("@", aliasPath);

import { createApp } from "./app";

const PORT = Number(process.env.PORT) || 10000;


/*
const app = express();
//const PORT = 5000;

app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`🚀 HTTP Server running at http://localhost:${PORT}`);
});
*/

async function bootstrap() {
  try{
  const { httpServer } = await createApp();

  httpServer.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });

  httpServer.on("error", (err) => {
    console.error("Server error:", err);
    //process.exit(1);
  });
  } catch (err: any) {
    console.error("❌ Failed to bootstrap server:", err);

    if (isProduction) {
      process.exit(1); // crash in production
    } else {
      console.warn("⚠️ Dev mode: server staying alive.");
    }
  }
}

bootstrap();

