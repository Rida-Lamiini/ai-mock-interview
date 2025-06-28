require("dotenv").config();
const express = require("express");
const { exec } = require("child_process");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 9000;
const SECRET_TOKEN = process.env.SECRET_TOKEN;
console.log(`🔐 Using token: ${SECRET_TOKEN}...`);

// Validate configuration
if (!SECRET_TOKEN) {
  console.error("❌ FATAL: SECRET_TOKEN environment variable not set");
  process.exit(1);
}

// Middleware
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

// Webhook endpoint
app.post("/webhook", (req, res) => {
  try {
    // 1. Verify secret token
    const token = req.headers["x-secret-token"];
    if (token !== SECRET_TOKEN) {
      console.warn("⚠️ Invalid token received");
      return res.status(403).json({ error: "Invalid token" });
    }

    // 2. Validate payload
    if (!req.body?.repository?.repo_name) {
      console.warn("⚠️ Invalid payload structure");
      return res.status(400).json({ error: "Invalid payload" });
    }

    const repo = req.body.repository.repo_name;
    console.log(`🔔 Webhook received for: ${repo}`);

    // 3. Determine service
    let service;
    if (repo.includes("frontend")) {
      service = "frontend";
    } else if (repo.includes("backend")) {
      service = "backend";
    } else {
      console.warn("⚠️ Unsupported repository");
      return res.status(400).json({ error: "Unsupported repository" });
    }

    // 4. Execute deployment
    console.log(`🚀 Triggering deployment for: ${service}`);
    const deployCmd = `./deploy.sh ${service}`;

    exec(
      deployCmd,
      { env: { ...process.env, SECRET_TOKEN } },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Deployment failed: ${error.message}`);
          return res.status(500).json({ error: "Deployment failed" });
        }
        console.log(`✅ Deployment output: ${stdout}`);
        if (stderr) console.warn(`⚠️ Deployment warnings: ${stderr}`);
        res.json({ success: true, service });
      }
    );
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
