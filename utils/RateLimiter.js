// utils/RateLimiter.js

class RateLimiter {
  constructor(limit = 5, windowMs = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.timestamps = [];
  }

  isRateLimited() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(ts => now - ts < this.windowMs);
     console.log(`📊 RateLimiter status: ${this.timestamps.length} requests in the last ${this.windowMs / 1000}s`);

    if (this.timestamps.length >= this.limit) {
      return true;
    }
    this.timestamps.push(now);
    return false;
  }
}

module.exports = RateLimiter;
