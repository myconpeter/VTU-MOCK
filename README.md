# 📘 VTU Wallet Backend (Node.js + Express + MongoDB)

This is a secure wallet funding backend built with **Node.js**, **Express**, **MongoDB**, and **VTpass API**. Users can fund their wallets via VTU services, while admins can monitor all transactions.

---

## 🚀 Features

-   🔐 JWT Authentication (Login & Signup)
-   👤 Role-Based Access (`user`, `admin`)
-   💸 Fund wallet via VTpass (Airtime, Data)
-   📄 Save all transactions to MongoDB
-   ⏱️ Requery pending VTU transactions via cron job
-   🧾 Admin-only route to view all transactions
-   🧩 Modular structure (services, controllers, routes)

---

## 🗃️ Tech Stack

-   **Backend:** Node.js, Express
-   **Database:** MongoDB with Mongoose
-   **Auth:** JWT (JSON Web Token)
-   **External API:** VTpass (sandbox or live)
-   **Scheduler:** node-cron

---

## 🏗️ Project Structure

/controllers → Business logic
/routes → Express route definitions
/services → External integrations (VTpass, DB actions)
/models → Mongoose schemas
/middlewares → Auth & error handling
/cron → Scheduled tasks (e.g., transaction requery)
.env → Environment variables

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/vtu-wallet-backend.git
cd vtu-wallet-backend
Install dependencies

bash
Copy
Edit
npm install
Setup .env

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/VTU_MOCK

JWT_SECRET=your_jwt_secret_key

VTPASS_API_KEY=your_api_key
VTPASS_USERNAME=your_username
VTPASS_PASSWORD=your_password
Run the project

bash
Copy
Edit
npm start
🔐 Authentication Routes
Register User
POST /api/auth/register

json
Copy
Edit
{
  "email": "user@example.com",
  "password": "123456"
}
Login User
POST /api/auth/login

json
Copy
Edit
{
  "email": "user@example.com",
  "password": "123456"
}
Response:

json
Copy
Edit
{
  "accessToken": "jwt_token_here"
}
💰 Wallet Routes
All routes below require Authorization: Bearer <token>

Fund Wallet via VTU API
POST /api/wallet/fund

json
Copy
Edit
{
  "amount": 200,
  "phone": "08123456789",
  "serviceID": "mtn-airtime"
}
Response:

json
Copy
Edit
{
  "message": "VTU request processed",
  "status": "pending",
  "txId": "TX-17201...",
  "requestId": "REQ-17201..."
}
🔁 VTpass Routes
Direct VTpass test access (for dev/admin use)

Initiate VTU Payment
POST /api/vtpass/pay

json
Copy
Edit
{
  "amount": 100,
  "phone": "08123456789",
  "serviceID": "airtel-airtime"
}
Requery VTU Transaction
GET /api/vtpass/requery?request_id=REQ-12345678

🛠 Admin Routes
Must be logged in as an admin role.

View All Transactions
GET /api/transactions/admin/all

Returns all transactions from all users.

🗃️ MongoDB Schemas
User Schema
js
Copy
Edit
{
  email: String,
  password: String (hashed),
  role: "user" | "admin"
}
Wallet Schema
js
Copy
Edit
{
  userId: ObjectId,
  balance: Number
}
Transaction Schema
js
Copy
Edit
{
  userId: ObjectId,
  amount: Number,
  txId: String,
  requestId: String,
  status: "pending" | "successful" | "failed"
}
⏱ Cron Job: Transaction Requery
Runs every 5 minutes

Checks for pending transactions

Requeries using VTpass /requery

Credits wallet on success

Updates transaction status to successful
```
