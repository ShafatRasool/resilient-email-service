const CircuitBreaker = require("../../utils/CircuitBreaker");

// ✅ Individual breaker for ProviderA
const breaker = new CircuitBreaker(3, 30000); // 3 failures → open for 30 seconds

module.exports = class ProviderA {
  async send({ to, subject, body }) {
    if (!breaker.canProceed()) {
      console.log("🚫 ProviderA circuit is OPEN. Skipping.");
      throw new Error("ProviderA circuit is open");
    }

    console.log(`ProviderA: Sending email to ${to}`);

    try {
      // Simulate failure (50% chance of failure)
      if (Math.random() < 0.5) {
        breaker.recordSuccess(); //success resets breaker
        return { success: true };
      } else {
        throw new Error("ProviderA failed randomly");
      }
    } catch (err) {
      breaker.recordFailure(); //track the failure
      throw err;
    }
  }
};
