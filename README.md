# 📧 Resilient Email Service

A fault-tolerant, queue-based email dispatching service built with Node.js.  
It features:
- ✅ Retry logic
- ✅ Fallback providers
- ✅ Rate limiting
- ✅ Duplicate prevention (idempotency)
- ✅ Circuit breaker pattern
- ✅ Queued job processing
- ✅ deployment on Render (public API)

---

## 🌐 Live Demo 
This project is deployed and can be tested via the following public URL:  
🔗 **[https://resilient-email-service-et40.onrender.com](https://resilient-email-service-et40.onrender.com)**

> *Note: Render spins down inactive services. First request may take ~30 seconds to wake.*

---

## 🛠 Features

- 📬 **Send Emails** using multiple providers with retry & fallback
- 🧠 **Idempotent by design** – duplicate `emailId`s won't trigger resend
- 🔁 **Retry with exponential backoff**
- 🚫 **Circuit Breaker** prevents retrying consistently failing providers
- 📉 **Rate Limiting** – max 5 requests per minute
- 📥 **In-memory Queue** for sequential processing
- 🧪 **Status endpoints** to check all or individual email status

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- Custom-built:
  - Rate limiter
  - Circuit breaker
  - Retry/fallback logic
  - In-memory queue
- Deployed on **Render**

---

## ▶️ Getting Started

### 1. Clone the Repository

git clone https://github.com/ShafatRasool/resilient-email-service.git
cd resilient-email-service

2. Install Dependencies
npm install

4. Start the Server
node app.js

Server will run on:
📍 http://localhost:3000

📤 API Endpoints
POST /send-email
Enqueue a new email for processing.

Request Body:
{
  "emailId": "unique_id_123",
  "to": "recipient@example.com",
  "subject": "Hello!",
  "body": "This is a test email."
}

Responses:
202 Accepted – Email added to queue

429 Too Many Requests – Rate limit exceeded

409 Conflict – Duplicate emailId

GET /status:
Returns all email statuses processed so far.

GET /status/:emailId
Check the status of a specific email by ID.

Sample Response (Status):

{
  "emailId": "abc123",
  "status": "sent",
  "providerUsed": "ProviderB",
  "retryCount": 2,
  "message": "Email sent successfully"
}

⚙️ How It Works
Rate Limiting: Max 5 emails per minute

Retries: Up to 3 attempts per provider, exponential backoff (100ms, 200ms, 400ms)

Fallback: ProviderB used if ProviderA fails

Circuit Breaker: Opens after 3 consecutive ProviderA failures (30 sec cooldown)

Idempotency: emailId tracked, duplicates return cached response

🚀 Deployment (Render)
Deployed to Render for live access:
🔗 https://resilient-email-service-et40.onrender.com

To deploy yourself:
Push code to GitHub
Create a Web Service on Render

Use:
Build command: npm install
Start command: node app.js
Instance type: Free (512 MB)

👨‍💻 Author
Shafat Rasool
📧 shafatrasooldev@gmail.com
🌐 GitHub – @ShafatRasool

📌 Notes
The service is in-memory only (no DB used).

It’s a demo-ready and extendable base — Redis, BullMQ, DB persistence, or real SMTP can be added easily.

✅ Future Improvements
Use Redis queue or BullMQ for production-scale job handling
Add email logs or audit trail in a database
Enable retry delays with a job scheduler
Use real providers like SendGrid, Mailgun, etc.
