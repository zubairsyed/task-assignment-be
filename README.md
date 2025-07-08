# Login Radius Assignment (Node.js + TypeScript Backend)

A secure, modular, and production-grade login system built with **Node.js**, **TypeScript**, **JWT**, and middleware like **rate limiting** and **authentication**. The structure follows a clean architecture pattern for scalability and testability.

---

## Project Structure

src/
├── App/
│ ├── controllers/
│ │ ├── Users/ # User APIs - controller, DTOs, model
│ │ ├── Test/ # Test APIs - controller, DTOs, model
│ │ └── BlockedIps/ # BlockedIps APIs - controller, DTOs, model
│ ├── routers/ # Express routes for each module
├── libs/
│ ├── Constants/ # Common constant values
│ ├── service-utils/ # JWT utilities and other services
│ └── Types/ # Custom TypeScript types/interfaces
├── Middleware/ # Custom Express middleware (auth, rate limiting)
├── main.ts # Entry point
├── database.ts # DB connection logic

---

## Data Schema Design

## -- UserSchema

invalidPasswordTimestamps: [Date],
password: String,
passwordLastUpdated: Date

-- invalidPasswordTimestamps → Stores timestamps of failed login attempts. Used for brute-force detection.
-- passwordLastUpdated → Helps enforce security policies like password rotation.

## -- BlockedIPsModel

ip: String,
count: Number,
blockedAt: { type: Date, default: Date.now },
expiresAt: Date,
userEmail: String,
isBlocked: { type: Boolean, default: false }

-- ip & count → Tracks how many times an IP failed authentication.
-- expiresAt + TTL index → Automatically removes blocked IPs after expiration — no manual cleanup required.
-- isBlocked → Flag to instantly block further access without recalculating logic.

## Features

- User authentication with **JWT**
- Brute-force protection via **rate limiting**
- **DTO-based validation** (using `joi`)
- Clean modular architecture (controllers, routers, services)
- Environment variable support
- Ready for deployment on **Google App Engine**

---

## Tech Stack

- **Node.js**
- **TypeScript**
- **Express**
- **MongoDB** (via Mongoose ors driver)
- **JWT**
- **Class-validator**
- **Rate limiting middleware**
- **Google App Engine**

---

## Installation

```bash
git clone https://github.com/zubairsyed/task-assignment-be.git
cd login-radius-assign
npm install
```

## Configuration

PORT=8080
JWT_SECRET=LOGIN@RADIUS

## Running the App

npm run dev

## Production build

npm run build
npm start

## Deployment

gcloud app deploy
