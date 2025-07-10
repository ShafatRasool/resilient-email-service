// utils/StatusTracker.js

class StatusTracker {
  constructor() {
    this.statusMap = new Map();
  }

  setStatus(emailId, statusObj) {
    this.statusMap.set(emailId, statusObj);
  }

  getStatus(emailId) {
    return this.statusMap.get(emailId);
  }

  hasStatus(emailId) {
    return this.statusMap.has(emailId);
  }
}

module.exports = StatusTracker;
