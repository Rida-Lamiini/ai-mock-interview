require("dotenv").config();
const express = require("express");
const { exec } = require("child_process");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 9000;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

// Validate configuration
if (!SECRET_TOKEN) {
  console.error("❌ FATAL: SECRET_TOKEN environment variable not set");
  process.exit(1);
}

// Middleware
app.use(express.json());

// Webhook endpoint for Docker Hub
app.post("/webhook", (req, res) => {
  try {
    // 1. Verify secret token
    const token = req.headers["x-secret-token"];
    if (token !== SECRET_TOKEN) {
      console.warn("⚠️ Invalid token received");
      console.log(
        `Expected: ${SECRET_TOKEN.substring(
          0,
          3
        )}..., Received: ${token?.substring(0, 3)}...`
      );
      return res.status(403).json({ error: "Invalid token" });
    }

    // 2. Validate Docker Hub payload
    if (!req.body?.repository || !req.body?.push_data) {
      console.warn("⚠️ Invalid Docker Hub payload structure");
      return res.status(400).json({ error: "Invalid payload" });
    }

    const repoName = req.body.repository.repo_name;
    const tag = req.body.push_data.tag;
    console.log(`🔔 Docker Hub webhook received for: ${repoName}:${tag}`);

    // 3. Determine service based on your image naming convention
    let service;
    if (repoName.includes("frontend")) {
      service = "frontend";
    } else if (repoName.includes("backend")) {
      service = "backend";
    } else {
      console.warn("⚠️ Unsupported repository");
      return res.status(400).json({ error: "Unsupported repository" });
    }

    // 4. Execute deployment
    console.log(`🚀 Triggering rebuild for: ${service}`);
    const deployCmd = `./deploy.sh ${service} ${tag}`;

    exec(deployCmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Rebuild failed: ${error.message}`);
        return res.status(500).json({ error: "Rebuild failed" });
      }
      console.log(`✅ Rebuild output: ${stdout}`);
      if (stderr) console.warn(`⚠️ Rebuild warnings: ${stderr}`);
      res.json({ success: true, service, tag });
    });
  } catch (err) {
    console.error("🔥 Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`🔐 Using token: ${SECRET_TOKEN.substring(0, 3)}...`);
});
