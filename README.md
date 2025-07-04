# 📘 VTU Wallet Backend (Node.js + Express + MongoDB)

This is a secure wallet funding backend built with **Node.js**, **Express**, **MongoDB**, and the **VTpass API**. It supports user authentication, wallet top-up using a VTU API (like VTpass), transaction tracking, cron-based requerying of pending transactions, and admin-only access to view all transactions.

---

## 🚀 Features

* JWT Authentication (Login & Signup)
* Role-Based Access (`user`, `admin`)
* Fund Wallet via VTpass API (Airtime, Data)
* MongoDB Transaction Storage
* Cron Job to Requery Pending Transactions
* Admin-Only Access to All Transactions
* Clean Modular Architecture (routes, controllers, services)

---

## 📃 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Auth:** JWT
* **API Integration:** VTpass
* **Scheduler:** node-cron

---

## 🏐 Folder Structure

```
/controllers          # Business logic
/routes               # Route definitions
/services             # VTpass logic + wallet/transaction services
/models               # Mongoose schemas
/middlewares          # JWT auth, error handling
/cron                 # Scheduled VTpass requery job
.env                  # Environment variables
```

---

## ⚙️ Setup

### 1. Clone Repo & Install

```bash
git clone https://github.com/yourusername/vtu-wallet-backend.git
cd vtu-wallet-backend
npm install
```

### 2. Configure `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/VTU_MOCK

JWT_SECRET=your_jwt_secret
VTPASS_API_KEY=your_vtpass_api_key
VTPASS_USERNAME=your_vtpass_username
VTPASS_PASSWORD=your_vtpass_password
```

### 3. Run App

```bash
npm start
```

The cron job will run automatically to handle `/requery` every 5 minutes.

---

## 🔐 Auth Routes

### Register

`POST /api/auth/register`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login

`POST /api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "<JWT_TOKEN>"
}
```

---

## 💰 Wallet Routes

> Requires `Authorization: Bearer <token>`

### Fund Wallet via VTpass

`POST /api/wallet/fund`

```json
{
  "amount": 200,
  "phone": "08123456789",
  "serviceID": "mtn-airtime"
}
```

**Response:**

```json
{
  "message": "VTU request processed",
  "status": "pending",
  "txId": "TX-...",
  "requestId": "REQ-..."
}
```

---

## ♻️ VTpass API Routes

### Initiate VTU Payment

`POST /api/vtpass/pay`

```json
{
  "amount": 100,
  "phone": "08123456789",
  "serviceID": "airtel-airtime"
}
```

### Requery Transaction

`GET /api/vtpass/requery?request_id=REQ-12345678`

---

## 🛠️ Admin Routes

> Must be logged in as an `admin` user

### View All Transactions

`GET /api/transactions/admin/all`

Returns:

```json
[
  {
    "userId": "...",
    "txId": "TX-...",
    "amount": 100,
    "status": "successful",
    "requestId": "REQ-..."
  },
  ...
]
```

---

## 📂 Mongoose Schemas

### User

```js
{
  email: String,
  password: String,
  role: "user" | "admin"
}
```

### Wallet

```js
{
  userId: ObjectId,
  balance: Number
}
```

### Transaction

```js
{
  userId: ObjectId,
  txId: String,
  requestId: String,
  amount: Number,
  status: "pending" | "successful" | "failed"
}
```

---

## ⏰ Cron Job (Requery)

* Checks all `pending` transactions every 5 minutes
* Calls VTpass `/requery` API
* If confirmed successful:

  * Wallet is credited
  * Transaction status updated to `successful`

---

## 📧 Contact

Author: **Micheal Peter**
Email: michealpeter040@gmail.com(mailto:michealpeter040@gmail.com)
License: MIT
