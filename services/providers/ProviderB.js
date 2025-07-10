// services/providers/ProviderB.js

let failureCount = 0;
let circuitOpen = false;
let lastFailureTime = 0;
const FAILURE_THRESHOLD = 3;
const COOLDOWN_PERIOD = 30000; // 30 seconds

module.exports = class ProviderB {
  async send({ to, subject, body }) {
    const now = Date.now();

    if (circuitOpen && now - lastFailureTime < COOLDOWN_PERIOD) {
      console.log("🚫 ProviderB circuit is OPEN. Skipping.");
      throw new Error("ProviderB circuit is open");
    }

    if (circuitOpen && now - lastFailureTime >= COOLDOWN_PERIOD) {
      console.log("🔁 ProviderB circuit is resetting.");
      circuitOpen = false;
      failureCount = 0;
    }

    console.log(`ProviderB: Sending email to ${to}`);

    if (Math.random() < 0.85) {
      console.log(`✅ ProviderB: Successfully sent email to ${to}`);
      failureCount = 0;
      return { success: true };
    } else {
      console.log(`❌ ProviderB: Failed to send email to ${to}`);
      failureCount++;
      if (failureCount >= FAILURE_THRESHOLD) {
        circuitOpen = true;
        lastFailureTime = now;
        console.log("🚨 ProviderB circuit opened due to repeated failures.");
      }
      throw new Error("ProviderB failed");
    }
  }
};
