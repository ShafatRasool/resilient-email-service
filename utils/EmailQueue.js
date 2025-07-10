// utils/EmailQueue.js
class EmailQueue {
  constructor(emailService) {
    this.queue = [];
    this.isProcessing = false;
    this.emailService = emailService;
  }

  enqueue(emailData) {
    this.queue.push(emailData);
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;

    const item = this.queue.shift();
    try {
      console.log(`Processing queued email: ${item.emailId}`);
      const result = await this.emailService.sendEmail(item);
      console.log(`Result for ${item.emailId}:`, result);
    } catch (err) {
      console.error(`Failed to send ${item.emailId}:`, err.message);
    }

    this.isProcessing = false;

    // Delay next item to simulate worker interval
    setTimeout(() => this.processQueue(), 500);
  }
}

module.exports = EmailQueue;
