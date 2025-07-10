// services/EmailService.js

const ProviderA = require("./providers/ProviderA");
const ProviderB = require("./providers/ProviderB");
const { statusTracker, rateLimiter } = require("../utils/SharedInstances");

module.exports = class EmailService {
  constructor() {
    this.providers = [new ProviderA(), new ProviderB()];
  }

  async sendEmail({ emailId, to, subject, body }) {
    // 🔄 Idempotency check (duplicate emailId)
    if (statusTracker.hasStatus(emailId)) {
      const previousStatus = statusTracker.getStatus(emailId);
      return {
        ...previousStatus,
        status: "duplicate",
        message: "Email already sent (duplicate)"
      };
    }


    let lastError = null;

    // 🔁 Retry logic with fallback providers
    for (const provider of this.providers) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await this.delay(2 ** attempt * 100); // exponential backoff
          const result = await provider.send({ to, subject, body });

          const status = {
            status: "sent",
            providerUsed: provider.constructor.name,
            retryCount: attempt,
            message: "Email sent successfully"
          };

          statusTracker.setStatus(emailId, status);
          return status;
        } catch (error) {
          // ✅ Circuit open — don't retry further for this provider
          if (error.message.includes("circuit is open")) {
            lastError = error.message;
            break;
          }

          lastError = error.message;
        }
      }
    }

    // ❌ All providers failed
    const failedStatus = {
      status: "failed",
      message: lastError || "All providers failed"
    };
    statusTracker.setStatus(emailId, failedStatus);
    return failedStatus;
  }

  delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
};
