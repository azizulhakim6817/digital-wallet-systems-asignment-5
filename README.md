Backend Live Link URL:
=> https://digital-wallet-systems-asignment-5.vercel.app/getUser

Github Live Link URL :
=> https://github.com/azizulhakim6817/digital-wallet-systems-asignment-5

Video link : 

### Digital Wallet API :
### 📄 Project Overview :
This project implements a Digital Wallet API system, which includes functionality like user registration, wallet management, transaction processing (deposit, withdraw, send), and role-based access control (admin, user, agent). The system supports JWT authentication, secure password hashing, and transaction tracking.

The core features of the system are:
User registration and login with JWT and refresh tokens
Role-based authorization (admin, user, agent)
Wallet management (deposit, withdraw, send money)
Transaction tracking (add money, withdraw, send money)
Admin management (view users, block/unblock wallets, approve agents)

### 🚀 Features

### User Features:
Register and login with JWT authentication
Add money to wallet
Withdraw money from wallet
Send money to another user
View transaction history

### Agent Features:
Cash-in money to a user's wallet
Cash-out money from a user's wallet

### Admin Features:
View all users and agents
View all transactions
Block/unblock wallets
Approve/suspend agents
🛠️ Technologies Used
Node.js with Express.js
MongoDB with Mongoose
JWT for authentication
Bcrypt for password hashing
Cookie-based session management
Role-based authorization


### 💻 API Endpoints : 
Authentication
POST /api/auth/register: Register a new user
Request: { "email": "user@example.com", "password": "password123" }
Response: { "accessToken": "your_access_token" }
POST /api/auth/login: Login and receive JWT
Request: { "email": "user@example.com", "password": "password123" }
Response: { "accessToken": "your_access_token", "refresh_token": "your_refresh_token" }
POST /api/auth/refresh-token: Refresh JWT using refresh token
Request: { "refresh_token": "your_refresh_token" }
Response: { "accessToken": "new_access_token" }
POST /api/auth/logout: Logout and clear cookies
Response: { "message": "Logged out successfully" }

### Transactions :
POST /api/transactions/deposit: Add money to wallet
Request: { "amount": 100 }
Response: { "message": "Money added successfully", "balance": 150 }
POST /api/transactions/withdraw: Withdraw money from wallet
Request: { "amount": 50 }
Response: { "message": "Money withdrawn successfully", "balance": 100 }
POST /api/transactions/send: Send money to another user
Request: { "recipientId": "userId", "amount": 30 }
Response: { "message": "Money sent successfully", "senderBalance": 70, "recipientBalance": 50 }
GET /api/transactions/history: View transaction history
Response: [ { "amount": 100, "type": "deposit", "status": "completed" }, ... ]

### Agent Features : 
POST /api/transactions/cash-in: Agent adds money to a user's wallet
Request: { "userId": "userId", "amount": 200 }

Response: { "message": "Cash-in successful", "balance": 250 }
POST /api/transactions/cash-out: Agent withdraws money from a user's wallet
Request: { "userId": "userId", "amount": 100 }
Response: { "message": "Cash-out successful", "balance": 150 }

### Admin Features :
GET /api/admin/users: View all users
Response: [ { "email": "user1@example.com" }, ... ]
GET /api/admin/transactions: View all transactions
Response: [ { "userId": "userId", "amount": 100, "status": "completed" }, ... ]
POST /api/admin/wallet/block: Block a user’s wallet
Request: { "userId": "userId" }
Response: { "message": "Wallet blocked successfully" }
POST /api/admin/wallet/unblock: Unblock a user’s wallet

Request: { "userId": "userId" }
Response: { "message": "Wallet unblocked successfully" }

🧪 Testing with Postman
You can use Postman to test the API endpoints. Here is a sample collection to test each of the endpoints.
Download the Postman collection from Postman Collection
Import the collection into Postman.
Set your JWT token in the Authorization header as Bearer <your_access_token>.

src/
├── modules/
│ ├── auth/
│ ├── user/
│ ├── wallet/
│ ├── transaction/
│ └── admin/
├── middlewares/
├── config/
├── utils/
├── app.ts
├── server.ts
