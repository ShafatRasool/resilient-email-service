const StatusTracker = require("./StatusTracker");
const RateLimiter = require("./RateLimiter");

const statusTracker = new StatusTracker();
const rateLimiter = new RateLimiter(5, 60000); // 5 emails per minute

module.exports = {
  statusTracker,
  rateLimiter
};
