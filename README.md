# Ligtas-Bayan | Editorial Brutalist Management System

[![Deployment: Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://sese-webprog-server.vercel.app)
[![Tech Stack: MERN](https://img.shields.io/badge/Tech_Stack-MERN-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)

A high-craft, professional editorial portal designed for streamlined article management and secure user authentication. Built with a focus on **Editorial Brutalist** aesthetics and serverless performance.

---

## 🏛️ Architecture

The project follows a decoupled **Client-Server** architecture optimized for horizontal scaling and serverless deployment.

### 💻 Client (`/sese-client`)
- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (High-Craft Editorial Design)
- **State Management**: Context API
- **Key Features**: Dynamic Article Rendering, Role-based Dashboards (Admin/Editor/Viewer).

### ⚙️ Server (`/sese-server`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT (JSON Web Tokens) with 1-hour session expiry.
- **Deployment**: Vercel Serverless Functions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account

### Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gamothalaman090-jpg/sese-webprog.git
   cd sese-webprog
   ```

2. **Backend Setup**
   ```bash
   cd sese-server
   npm install
   ```
   Create a `.env` file in `sese-server/`:
   ```env
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secure_secret_key
   PORT=8001
   ```

3. **Frontend Setup**
   ```bash
   cd ../sese-client
   npm install
   ```
   Create a `.env` file in `sese-client/`:
   ```env
   VITE_API_URL=http://localhost:8001/api
   ```

4. **Run the Application**
   - **Server**: `cd sese-server && npm run dev`
   - **Client**: `cd sese-client && npm run dev`

---

## 🔐 Security & Production

### Vercel Deployment
The backend is configured for Vercel using `vercel.json`. Ensure the following Environment Variables are set in the Vercel Dashboard:
- `MONGO_URI`
- `JWT_SECRET`

### Case-Sensitivity Fix
The project implements a strict naming convention (`*Model.js`) to ensure compatibility between case-insensitive Windows development and case-sensitive Linux production environments.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, GSAP |
| **Backend** | Node.js, Express |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, BcryptJS |
| **Infrastructure** | Vercel, GitHub Actions |

---

## 📜 License
Internal Project - All Rights Reserved.
