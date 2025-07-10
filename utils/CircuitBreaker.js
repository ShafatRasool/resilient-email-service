class CircuitBreaker {
  constructor(failureThreshold = 5, cooldownTime = 60000) {
    this.failureThreshold = failureThreshold;
    this.cooldownTime = cooldownTime;
    this.failureCount = 0;
    this.state = "CLOSED"; // CLOSED, OPEN, HALF_OPEN
    this.lastFailureTime = null;
  }

  canProceed() {
    if (this.state === "CLOSED") {
      return true;
    }

    const now = Date.now();
    if (this.state === "OPEN") {
      if (now - this.lastFailureTime >= this.cooldownTime) {
        this.state = "HALF_OPEN";
        return true;
      } else {
        return false;
      }
    }

    // If HALF_OPEN, allow 1 attempt
    return true;
  }

  recordSuccess() {
    this.failureCount = 0;
    this.state = "CLOSED";
    this.lastFailureTime = null;
  }

  recordFailure() {
    this.failureCount += 1;

    if (this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
      this.lastFailureTime = Date.now();
      console.log(`🚨 Circuit opened due to repeated failures.`);
    }
  }

  getState() {
    return this.state;
  }
}

module.exports = CircuitBreaker;
