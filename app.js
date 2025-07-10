// app.js
console.log("Starting server...");

const express = require("express");
const EmailService = require("./services/EmailService");
const EmailQueue = require("./utils/EmailQueue");
const { statusTracker } = require("./utils/SharedInstances");
const { rateLimiter } = require("./utils/SharedInstances");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const emailService = new EmailService();
const emailQueue = new EmailQueue(emailService);

// POST /send-email now enqueues
app.post("/send-email", async (req, res) => {
  const { emailId, to, subject, body } = req.body;

  // Reject early if rate-limited
  if (rateLimiter.isRateLimited()) {
    return res.status(429).json({
      status: "rate-limited",
      message: "Too many requests, try again later"
    });
  }

  // Add to queue
  emailQueue.enqueue({ emailId, to, subject, body });
  res.status(202).json({ status: "queued", message: "Email added to queue" });
});

// check all emails & there statuses
app.get("/status", (req, res) => {
  const all = Array.from(statusTracker.statusMap.entries()).map(([id, status]) => ({
    emailId: id,
    ...status
  }));
  res.json(all);
});

// check specific email's status
app.get("/status/:emailId", (req, res) => {
  const { emailId } = req.params;
  const status = statusTracker.getStatus(emailId);

  if (!status) {
    return res.status(404).json({ message: "No status found for this email ID" });
  }

  res.json(status);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
