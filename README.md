# Backend - Login System Assignment

A secure Node.js + TypeScript backend API for login and authentication workflows, deployable on **Google Cloud App Engine (GAE)**.

---

# Tech Stack

| Feature       | Technology                    |
| ------------- | ----------------------------- |
| Runtime       | Node.js                       |
| Language      | TypeScript                    |
| Web Framework | Express (v5)                  |
| Database      | MongoDB + Mongoose            |
| Auth          | JWT (access tokens)           |
| Validation    | Joi + joi-password            |
| Security      | express-rate-limit + bcrypt   |
| Date Handling | date-fns + date-fns-tz        |
| Deployment    | Google Cloud App Engine (GAE) |

---

## Project Structure

src/
├── App/
│ ├── controllers/
│ │ ├── Users/ # User APIs - controller, DTOs,
│ │ ├── Test/ # Test APIs - controller, DTOs, model
│ │ └── BlockedIps/ # BlockedIps APIs - controller, DTOs, model
│ ├── routers/ # Express routes for each module
├── libs/
│ ├── Constants/ # Common constant values
│ ├── service-utils/ # JWT utilities and other
│ └── Types/ # Custom TypeScript types/interfaces
├── Middleware/ # Custom Express middleware (auth, rate limiting)
├── main.ts # Entry point
├── database.ts # DB connection logic
├── Utils/ #functions to handle (getting IP and password handler)

---

## Data Schema Design

To fulfill the application requirements, the backend defines two primary MongoDB collections:

1. Users Collection
2. BlockedIps Collection

## Why Not Combine Them?

Keeping everything in a single collection may seem simpler, but separating user and IP data provides better:

Performance
Scalability
Separation of concerns

# Performance -

With a growing user base, mixing unrelated IP data can degrade query performance on user documents.

# Usage Frequency -

Blocked IP entries change frequently and are short-lived, - unlike long-term user records.

# Responsibility Split -

Users → Identity-level logic; BlockedIps → Network-level logic. Different scopes = different behaviors.

# Indexing & Query Optimization -

BlockedIps can be optimized with TTL indexing, reducing storage & boosting read speed.

# Cleanup Simplicity -

Blocked IPs are - auto-expiring - separating them allows automatic cleanup using TTL indexes without affecting user data.

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

## Logic:

On abuse (e.g., repeated failed attempts), an IP is added here with a blockedUntil.

Before login, system checks if the IP is in this list and still blocked.

--> Once blockedUntil time is passed, MongoDB automatically deletes the document using a TTL index.

## - sample testModel (for checking brute force attacks)

-- To test dummy data a get api for particular number of requests after sign-in for specified time will block the IP.

# Note -

You can check this after sign-in on the homepage.

## Benefits of This Design

Efficient login lockout system using both user- and IP-level control.

Automatic cleanup of blocked IPs — no manual job or cron needed.

Better system health and scalability under brute-force or abusive traffic.

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

# Deployment steps

1.  Install Google Cloud CLI
    https://cloud.google.com/sdk/docs/install

2.  Login to GCP
    gcloud auth login

3.  Set Project
    gcloud config set project test-assignment-465311

4.  Deploy
    npm run build
    gcloud app deploy
    Gloud app browse
