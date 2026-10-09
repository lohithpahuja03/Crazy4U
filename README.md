# 🍕 Crazy4U — Food Ordering Platform

> **Good Food. Good Mood. Crazy4U.**

A modern, full-featured food ordering web application built with React and Node.js. Crazy4U provides a seamless and visually polished food ordering experience — from browsing categories and customizing orders to tracking delivery and earning loyalty tokens.

---

## 🚀 Features

- **Browse & Search** — Explore food by category, cuisine, or keyword
- **Food Customization** — Choose sizes, variants, and toppings
- **Smart Cart** — Add, remove, update quantities with live price calculation
- **Promotional Offers** — 20% off Wed & Fri | 25% off orders above ₹3,999
- **Secure Authentication** — Sign up, login, and manage your profile
- **Checkout** — Multi-step checkout with address and payment selection
- **Payment Methods** — Paytm, Google Pay, and Cash on Delivery
- **COD Restrictions** — COD only for orders between ₹599 and ₹4,999
- **Order Tracking** — Real-time-style order status progression
- **Order Cancellation** — Cancel within 5 minutes of placing an order
- **Crazy4U Tokens** — Earn loyalty tokens for every successful order
- **Order History** — View and reorder from your previous orders
- **Delivery ETA** — Simulated delivery tracking with estimated arrival

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| React Router DOM | Client-side routing |
| Zustand | Lightweight state management |
| Axios | HTTP requests |
| React Hot Toast | Toast notifications |
| Vanilla CSS | Custom design system |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API framework |
| MongoDB + Mongoose | Database and ODM |
| bcryptjs | Password hashing |
| JSON Web Token | Authentication |
| express-validator | Input validation |
| dotenv | Environment variables |
| cors | Cross-origin resource sharing |

---

## 📁 Folder Structure

`
Crazy4U/
├── frontend/                  # React Vite application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page-level components
│   │   ├── store/             # Zustand state stores
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service functions
│   │   ├── utils/             # Utility/helper functions
│   │   ├── data/              # Mock data
│   │   └── styles/            # Global CSS and design tokens
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── backend/                   # Express REST API
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # Express routers
│   │   ├── middleware/        # Auth, error, validation
│   │   ├── services/          # Business logic
│   │   └── config/            # DB and environment config
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── README.md
└── ROADMAP.md
`

---

## ⚙️ Installation

### Frontend
`ash
cd frontend
npm install
npm run dev
`
Runs at: http://localhost:5173

### Backend
`ash
cd backend
npm install
cp .env.example .env
npm run dev
`
Runs at: http://localhost:5000

---

## 🔐 Environment Variables

Create backend/.env from backend/.env.example:

`
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crazy4u
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
`

---

## 🎯 Business Rules

| Rule | Detail |
|---|---|
| COD Availability | Orders between Rs.599 and Rs.4,999 only |
| Order Cancellation | Allowed within 5 minutes of placement |
| Wednesday/Friday Discount | 20% off all orders |
| Large Order Discount | 25% off orders above Rs.3,999 |
| Token Rewards | Earned after successful delivery |
| No Tokens for Cancellations | Cancelled orders earn no tokens |

---

## 📊 Status

Current Phase: Phase 1 - Project Foundation (Complete)

See ROADMAP.md for full development plan.

---

*Built with love for food lovers.*
