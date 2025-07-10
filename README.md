# 📧 Resilient Email Service

A fault-tolerant, queue-based email dispatching service built with Node.js.  
It features:

- ✅ Retry logic  
- ✅ Fallback providers  
- ✅ Rate limiting  
- ✅ Duplicate prevention (idempotency)  
- ✅ Circuit breaker pattern  
- ✅ Queued job processing  
- ✅ Deployment on Render (public API)  

---

## 🌐 Live Demo

🔗 **[https://resilient-email-service-et40.onrender.com/status](https://resilient-email-service-et40.onrender.com/status)**  
> *Note: Render spins down inactive services. First request may take ~30 seconds to wake.*

---

## 🛠 Features

- 📬 Send Emails using multiple providers with retry & fallback  
- 🧠 Idempotent by design – duplicate `emailId`s won't trigger resend  
- 🔁 Retry with exponential backoff  
- 🚫 Circuit Breaker prevents retrying consistently failing providers  
- 📉 Rate Limiting – max 5 requests per minute  
- 📥 In-memory Queue for sequential processing  
- 🧪 Status endpoints to check all or individual email status  

---

## 📦 Tech Stack

- Node.js  
- Express.js  
- Custom-built:
  - Rate limiter  
  - Circuit breaker  
  - Retry/fallback logic  
  - In-memory queue  
- Deployed on Render  

---

## ▶️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ShafatRasool/resilient-email-service.git
cd resilient-email-service
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
node app.js
```

Server will run on:
📍 http://localhost:3000

### 📤 API Endpoints
#### POST /send-email
Request Body:
```json
 {
  "emailId": "unique_id_123", 
  "to": "recipient@example.com", 
  "subject": "Hello!",
  "body": "This is a test email."
} 
``` 

Responses:
202 Accepted – Email added to queue

429 – Rate limit exceeded

409 – Duplicate emailId

### GET /status
#### Returns all email statuses processed so far.

### GET /status/:emailId
#### Check the status of a specific email by ID.

Sample Response:
```json
{
  "emailId": "abc123",
  "status": "sent",
  "providerUsed": "ProviderB",
  "retryCount": 2,
  "message": "Email sent successfully"
}
```
⚙️ How It Works
Rate Limiting: Max 5 emails per minute

Retries: Up to 3 attempts per provider with exponential backoff (100ms, 200ms, 400ms)

Fallback: ProviderB used if ProviderA fails

Circuit Breaker: Opens after 3 consecutive ProviderA failures (30 sec cooldown)

Idempotency: emailId tracked, duplicates return cached response

🚀 Deployment (Render)
Deployed to Render:
🔗 https://resilient-email-service-et40.onrender.com

To deploy yourself:

Push code to GitHub

Create a Web Service on Render

Build command: npm install

Start command: node app.js

Instance type: Free (512 MB)

## 👨‍💻 Author

- **Name:** Shafat Rasool  
- **Email:** [shafatrasooldev@gmail.com](mailto:shafatrasooldev@gmail.com)  
- **GitHub:** [@ShafatRasool](https://github.com/ShafatRasool)  
- **LinkedIn:** [linkedin.com/in/shafatrasool](https://www.linkedin.com/in/shafatrasool)


### 📌 Notes

This service is in-memory only (no DB used).  
It’s a demo-ready and extendable base.

### ✅ Future Improvements

- Use Redis queue or BullMQ for production-scale job handling  
- Add email logs or audit trail in a database  
- Enable retry delays with a job scheduler  
- Use real providers like SendGrid, Mailgun, etc.
