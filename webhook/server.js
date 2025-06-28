const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9000;
const VALID_TOKEN = process.env.SECRET_TOKEN;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const token = req.headers["x-secret-token"];
  if (token !== VALID_TOKEN) {
    console.warn("🔐 Invalid token received");
    return res.status(403).send("Forbidden: Invalid token");
  }

  const repo = req.body?.repository?.repo_name;
  console.log(`🔔 Webhook triggered for repository: ${repo}`);

  let service = null;

  if (repo?.includes("frontend")) {
    service = "frontend";
  } else if (repo?.includes("backend")) {
    service = "backend";
  } else {
    console.warn("⚠️ Unknown repo in webhook payload");
    return res.status(400).send("Unknown repository");
  }

  const command = `docker compose -f docker-compose.prod.yml pull ${service} && docker compose -f docker-compose.prod.yml up -d ${service}`;
  console.log(`🚀 Running deployment for ${service}: ${command}`);

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Deployment error:", err);
      return res.status(500).send("Deployment failed");
    }
    console.log("✅ Deployment complete:", stdout);
    if (stderr) console.warn("⚠️ Deployment warnings:", stderr);
    res.send(`Deployment triggered for ${service}`);
  });
});

app.listen(PORT, () => {
  console.log(`🌐 Webhook server running on port ${PORT}`);
});
